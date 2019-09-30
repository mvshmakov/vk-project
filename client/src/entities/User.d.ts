export interface IUser {
    _id?: string;
    first_name: string;
    last_name: string;
    email?: string;
    sex?: number;
    photo_100: string;
    photo_200: string;
    role: TUserRole;
    city?: {
        id: number;
        title: string;
    }
    country?: {
        id: number;
        title: string;
    }
}

export type TUserRole = {
    SUBSCRIBER: "SUBSCRIBER",
    CONTENT_MAKER: "CONTENT_MAKER"
}
