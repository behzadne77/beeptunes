export class HttpError extends Error {
  public readonly status: number;
  public readonly url: string;
  public readonly details?: unknown;

  constructor(message: string, opts: { status: number; url: string; details?: unknown }) {
    super(message);
    this.name = 'HttpError';
    this.status = opts.status;
    this.url = opts.url;
    this.details = opts.details;
  }
}

function isJsonResponse(response: Response): boolean {
  const contentType = response.headers.get('content-type');
  return contentType != null && contentType.toLowerCase().includes('application/json');
}

async function parseBody<T>(response: Response): Promise<T | string | null> {
  if (response.status === 204) return null;
  if (isJsonResponse(response)) {
    try {
      return (await response.json()) as T;
    } catch (_) {
      // Fall through to text if JSON parsing fails
    }
  }
  try {
    return await response.text();
  } catch (_) {
    return null;
  }
}

function resolveBaseUrl(): string {
  const fromPublic = process.env.NEXT_PUBLIC_API_BASE_URL;
  const fromServer = process.env.API_BASE_URL;
  const base = fromPublic ?? fromServer;
  if (!base) {
    throw new Error('API base URL is not defined. Set NEXT_PUBLIC_API_BASE_URL or API_BASE_URL');
  }
  return base.endsWith('/') ? base : `${base}/`;
}

export type ApiRequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
  headers?: HeadersInit;
  body?: unknown;
  query?: Record<string, string | number | boolean | null | undefined>;
  signal?: AbortSignal;
  // passthroughs like credentials, mode, cache can be added when needed
};

function buildUrl(path: string, query?: ApiRequestOptions['query']): string {
  const base = resolveBaseUrl();
  const url = new URL(path.replace(/^\//, ''), base);
  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value === undefined || value === null) return;
      url.searchParams.set(key, String(value));
    });
  }
  return url.toString();
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const url = buildUrl(path, options.query);
  const method = options.method ?? 'GET';

  const headers: HeadersInit = {
    Accept: 'application/json',
    ...(options.headers ?? {}),
  };

  let bodyInit: BodyInit | undefined;
  if (options.body !== undefined && method !== 'GET' && method !== 'HEAD') {
    const hasContentType = Object.keys(headers as Record<string, string>)
      .some((k) => k.toLowerCase() === 'content-type');
    if (!hasContentType) {
      (headers as Record<string, string>)['Content-Type'] = 'application/json';
    }
    if ((headers as Record<string, string>)['Content-Type']?.includes('application/json')) {
      bodyInit = JSON.stringify(options.body);
    } else {
      // Let callers pass FormData/URLSearchParams/etc by providing Content-Type
      bodyInit = options.body as BodyInit;
    }
  }

  const response = await fetch(url, {
    method,
    headers,
    body: bodyInit,
    signal: options.signal,
  });

  const parsed = await parseBody<T>(response);
  if (!response.ok) {
    throw new HttpError(
      `Request failed with status ${response.status}`,
      { status: response.status, url: response.url || url, details: parsed }
    );
  }
  return parsed as T;
}