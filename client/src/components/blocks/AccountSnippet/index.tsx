import * as React from "react";
import { Cell, Avatar } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { IFunctionalBlock } from "@/utils/typings/Components";

import { IUser } from "@/entities/User";

import Icon24Settings from "@vkontakte/icons/dist/24/settings";

import "./styles.scss";

interface IProps {
    user: IUser;
    onSnippetClick: (...args: any[]) => any;
}

const AccountSnippetBlock: IFunctionalBlock<IProps> = ({
    user,
    onSnippetClick
}: IProps) => (
        <Cell
            className="settings-snippet-block"
            before={<Avatar src={user && user.photo_100} size={80} />}
            asideContent={<Icon24Settings />}
            description={user && user.city.title}
            onClick={onSnippetClick}
        >
            {user && (user.first_name + " " + user.last_name)}
        </Cell>
    );

export default AccountSnippetBlock;
