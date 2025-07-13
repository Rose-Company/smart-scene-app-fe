import { apiClient } from "../apiClient";

type LoginResponse = {
    token: string;
    user: {
        id: string;
        email: string;
        full_name: string;
        role: string;
        status: string;
        created_at: string;
        updated_at: string;
    };
};

export async function login(email: string, password: string) {
    return await apiClient<LoginResponse>(
        "/auth/login",
        "POST",
        { email, password }
    );
}

