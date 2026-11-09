// The only file that calls fetch

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// The body is returned as unknown: the caller checks its shape before using it
export async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new ApiError(res.status, "Request failed");
  }

  const body: unknown = await res.json();
  return body;
}
