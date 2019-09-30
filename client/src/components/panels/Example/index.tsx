import * as React from "react";
import { Panel, PanelHeader } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import ExampleBlock from "@/components/blocks/Example";
import {IFunctionalPanel} from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    id: string;
    text?: string;
    title?: string;
    buttonText?: string;
    onButtonClick: (...args) => any;
}

export const ExamplePanel: IFunctionalPanel<IProps> = ({ id, ...props }) => (
    <Panel id={id}>
        <PanelHeader noShadow>VK Project</PanelHeader>
        <ExampleBlock {...props} />
    </Panel>
);

export default ExamplePanel;
