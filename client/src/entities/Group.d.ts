export interface IGroup {
    _id: string;
    id: number;
    label: string;
    description: string;
    type: "group";
    additional: IGroupAdditional;
    tags: any[];
}

interface IGroupAdditional {
    program_name: string;
    course: number;
}
