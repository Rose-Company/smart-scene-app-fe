import axiosInstance  from "@/lib/axios";

export const Login = async (email: string, password: string) => {
    try {
        const response = await axiosInstance.post("/auth/login", {
            email,
            password,
        });
        
        if (response.status === 200) {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));
        }
    }
    catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const Logout = async () => {
    try {
        const response = await axiosInstance.post("/auth/logout");
        if (response.status === 200) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }
}