/**
 * CSRF-protected fetch wrapper.
 * Reads the csrf-token cookie and attaches it as x-csrf-token header on all mutating requests.
 */

function getCsrfToken(): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(/(?:^|;\s*)csrf-token=([^;]*)/);
  return match ? match[1] : "";
}

export async function csrfFetch(
  url: string,
  options: RequestInit = {}
): Promise<Response> {
  const method = (options.method || "GET").toUpperCase();
  const isMutating = ["POST", "PATCH", "PUT", "DELETE"].includes(method);

  const headers = new Headers(options.headers || {});

  if (isMutating) {
    headers.set("x-csrf-token", getCsrfToken());
  }

  // Ensure JSON content type for mutating requests with body
  if (isMutating && options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(url, {
    ...options,
    headers,
  });
}
