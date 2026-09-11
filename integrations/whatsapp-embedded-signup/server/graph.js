/**
 * Cliente mínimo da Graph API. Node 18+ (fetch global).
 */

export class GraphError extends Error {
  constructor(message, { status, body } = {}) {
    super(message);
    this.name = "GraphError";
    this.status = status;
    this.body = body;
  }
}

export function graphClient({ graphVersion }) {
  const base = `https://graph.facebook.com/${graphVersion}`;

  async function request(method, path, { query = {}, body, accessToken } = {}) {
    const url = new URL(`${base}/${path.replace(/^\//, "")}`);
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined && value !== null) url.searchParams.set(key, String(value));
    }

    const headers = {};
    if (accessToken) headers.Authorization = `Bearer ${accessToken}`;
    if (body) headers["Content-Type"] = "application/json";

    const response = await fetch(url, { method, headers, body: body ? JSON.stringify(body) : undefined });
    const payload = await response.json().catch(() => ({}));

    if (!response.ok) {
      const detail = payload?.error?.message ?? response.statusText;
      throw new GraphError(`${method} ${path} falhou: ${detail}`, { status: response.status, body: payload });
    }
    return payload;
  }

  return {
    get: (path, options) => request("GET", path, options),
    post: (path, options) => request("POST", path, options),
    del: (path, options) => request("DELETE", path, options),
  };
}
