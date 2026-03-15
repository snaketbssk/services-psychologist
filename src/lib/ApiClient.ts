// lib/apiClient.ts
// Single place for all HTTP calls to the C# backend.
// Base URL is read from .env — never hardcoded in components.
//
// .env.local:
//   NEXT_PUBLIC_API_URL=http://localhost:7271
//
// .env.production:
//   NEXT_PUBLIC_API_URL=https://api.yourdomain.com

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? 'https://snaketbs.com/api/psychologist/'

// ─── Types ────────────────────────────────────────────────────────────────────

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

interface RequestOptions<TBody = unknown> {
  method?: HttpMethod
  body?: TBody
  headers?: Record<string, string>
}

// ─── Core request ─────────────────────────────────────────────────────────────

async function request<TResponse = void, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const { method = 'GET', body, headers = {} } = options

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`[${method} ${path}] ${res.status}: ${text}`)
  }

  // Return undefined for empty responses (204, or no JSON content-type)
  const contentType = res.headers.get('content-type') ?? ''
  const contentLength = res.headers.get('content-length')

  const isEmpty = res.status === 204 || contentLength === '0' || !contentType.includes('application/json')

  if (isEmpty) return undefined as TResponse

  const text = await res.text()
  if (!text) return undefined as TResponse

  return JSON.parse(text) as TResponse
}

// ─── HTTP helpers ─────────────────────────────────────────────────────────────

export const apiClient = {
  get: <TResponse>(path: string, headers?: Record<string, string>) =>
    request<TResponse>(path, { method: 'GET', headers }),

  post: <TResponse = void, TBody = unknown>(path: string, body: TBody, headers?: Record<string, string>) =>
    request<TResponse, TBody>(path, { method: 'POST', body, headers }),

  put: <TResponse = void, TBody = unknown>(path: string, body: TBody, headers?: Record<string, string>) =>
    request<TResponse, TBody>(path, { method: 'PUT', body, headers }),

  patch: <TResponse = void, TBody = unknown>(path: string, body: TBody, headers?: Record<string, string>) =>
    request<TResponse, TBody>(path, { method: 'PATCH', body, headers }),

  delete: <TResponse = void>(path: string, headers?: Record<string, string>) =>
    request<TResponse>(path, { method: 'DELETE', headers })
}
