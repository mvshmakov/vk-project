const CODE_URL = "https://api.hseapp.ru/gateway/auth/code";
const REFRESH_URL = "https://api.hseapp.ru/gateway/auth/code";

export const postEmailForVerificationCode = async (email: string): Promise<string> => {
    const response = await fetch(CODE_URL, {
        method: "POST",
        body: JSON.stringify({ email })
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const putVerificationCodeForAccessToken = async (email: string, code: string): Promise<{
    access_token: string,
    refresh_token: string
}> => {
    const response = await fetch(CODE_URL, {
        method: "PUT",
        body: JSON.stringify({ email, code })
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};

export const postRefreshTokenForAccessToken = async (refreshToken: string): Promise<{
    access_token: string,
    refresh_token: string
}> => {
    const response = await fetch(REFRESH_URL, {
        method: "POST",
        body: JSON.stringify({ refresh_token: refreshToken })
    });

    if (!response.ok) {
        throw Error(response.statusText);
    }

    return await response.json();
};
