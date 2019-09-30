import * as React from "react";
import { Cell, Avatar } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { IFunctionalBlock } from "@/utils/typings/Components";

import { IUser } from "@/entities/User";

import "./styles.scss";

interface IProps {
    user: IUser;
    onSnippetClick: (...args: any[]) => any;
}

const SettingsSnippetBlock: IFunctionalBlock<IProps> = ({
    user,
    onSnippetClick
}: IProps) => (
    <Cell
        before={<Avatar src={user.avatar_url} />}
        description={user.category}
        onClick={onSnippetClick}
    >
        {user && user.profileName}
    </Cell>
);

export default SettingsSnippetBlock;
