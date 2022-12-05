export function request<TResponse>(
  url: string,
  config: RequestInit = {},
): Promise<TResponse> {
  return fetch(url, config)
    .then((response) => response.json())
    .then((data) => data as TResponse);
}

export function buildQueryString(query: Record<string, any>): string {
  return Object.entries(query)
    .map(([key, value]) =>
      key && value
        ? `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        : "",
    )
    .join("&");
}
