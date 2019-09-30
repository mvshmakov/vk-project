const BACKEND_BASE = "http://localhost";

const INIT_REQUEST_SETTINGS: RequestInit = {
    method: "GET",
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
    }
};

interface FetchArgs {
    route: string;
    settings?: RequestInit;
}

class FetchError extends Error { }

/**
 * Инкапсулируем базовые нужды для запросов на бекенд и обработку ошибок
 */
export default async ({ route, settings }: FetchArgs): Promise<any> => {
    const url = `${BACKEND_BASE}${route}`;
    const response = await fetch(url, { ...INIT_REQUEST_SETTINGS, ...settings});

    if (!response.ok) {
        throw new FetchError(response.statusText);
    }

    return await response.json();
};
