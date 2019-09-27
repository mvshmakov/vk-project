export interface IProfile {
    id: number | string;
    ownerId: number | string;
    profileName: string;
    profileDescription: string;
    category: string;
    avatar_url: string;
}
