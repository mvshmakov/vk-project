export interface IUser {
    _id: string;
    id: number;
    label: string;
    description: string;
    type: string;
    additional: UserAdditional;
    tags: any[];
}

interface UserAdditional {
    group_name: string;
    group: number;
    email: string;
    email_original?: string;
}
