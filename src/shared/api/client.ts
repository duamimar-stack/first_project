const BASE_URL= 'https://shopboard-api.vercel.app';
export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}
export async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(BASE_URL + path);

  if (!res.ok) {
    throw new ApiError(res.status, `Request failed with status ${res.status}`);
  }

  return (await res.json()) as T;
}
export async function getJson<T>(url: string): Promise<T> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError(res.status, "Request failed");
  }

  return (await res.json()) as T;
}