export interface IProfile {
    _id?: string;
    ownerId: number | string;
    profileName: string;
    profileDescription: string;
    profileСategory: string;
    avatar_url: string;
}
