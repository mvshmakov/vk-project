export interface IUser {
    id: number;
    username: string;
    email: string;
    role: TUserRole;
    profileName: string;
    profileDescription: string;
    category: string;
    avatar_url?: string;
}

export type TUserRole = {
    SUBSCRIBER: "SUBSCRIBER",
    CONTENT_MAKER: "CONTENT_MAKER"
}