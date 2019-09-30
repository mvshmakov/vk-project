import * as React from "react";
import { Cell } from "@vkontakte/vkui";
import Icon24Users from "@vkontakte/icons/dist/24/users";
import "@vkontakte/vkui/dist/vkui.css";

import { IFunctionalBlock } from "@/utils/typings/Components";

import "./styles.scss";

type IEntity = "student" | "group";
interface IProps {
    entity: IEntity;
    title: string;
    userId: number;
    description: string;
    onClick: (...args: any[]) => any;
}

const iconPicker = (entity: IEntity) => {
    switch (entity) {
        case "student":
            return <Icon24Users />;
        default:
            return null;
    }
};

const UserSnippetBlock: IFunctionalBlock<IProps> = ({
    entity = "student",
    userId = 123,
    title = "",
    description = "",
    onClick
}: IProps) => (
    <Cell
        size="m"
        expandable={true}
        description={description}
        before={iconPicker(entity)}
        style={{ width: "100%" }}
        onClick={onClick}
    >
        <div style={{ width: "100%" }}>{title}</div>
    </Cell>
);

export default UserSnippetBlock;
