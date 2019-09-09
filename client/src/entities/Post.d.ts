export interface IPostProps {
    name: string;
    date: string;
    img: string;
    attachments: IAttachments;
}

export interface IAttachments {
    text?: string;
    video?: string; // url?
    audio?: string;
    img?: string;
}