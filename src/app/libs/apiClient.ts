const BASE_URL = "http://localhost:8080/api/v1";

export async function apiClient<T>(
    endpoint: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    token?: string
): Promise<T> {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    });

    if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "API request failed");
    }

    return response.json();
}
