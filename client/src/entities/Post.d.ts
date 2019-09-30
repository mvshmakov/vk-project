export interface IPost {
    name: string;
    createdAt: string;
    avatar: string;
    attachments: IAttachments;
}

export interface IAttachments {
    text?: string;
    video?: string; // url?
    audio?: string;
    img?: string;
}
