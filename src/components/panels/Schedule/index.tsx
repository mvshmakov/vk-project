import * as React from "react";
import { Panel, PanelHeader, Group } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import "./styles.scss";

interface IProps {
    id: string;
}

export default ({ id }: IProps) => (
    <Panel id={id}>
        <PanelHeader noShadow>VK Project</PanelHeader>
        <Group title="Users">Hello, mzfk</Group>
    </Panel>
);
