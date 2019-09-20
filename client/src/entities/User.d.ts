export interface IUser {
    _id: string;
    id: number;
    label: string;
    description: string;
    type: "student" | "lecturer";
    additional: IUserAdditional;
    tags: any[];

    profileName: string;
    profileDescription: string;
    category: string;
}

interface IUserAdditional {
    group_name: string;
    group: number;
    email: string;
    email_original?: string;
    avatar_url?: string;
}
