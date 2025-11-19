// Query client + API client
// apps/frontend/lib/apiClient.ts
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000/api';

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, { cache: 'no-store' });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error ?? 'API error');
  }
  return json.data as T;
}

export async function apiPost<T>(
  path: string,
  body?: unknown,
  method: 'POST' | 'PATCH' = 'POST',
): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error ?? 'API error');
  }
  return json.data as T;
}
