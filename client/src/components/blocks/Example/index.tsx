import * as React from "react";
import { Group, Div, Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import {IFunctionalBlock} from "@/utils/typings/Components";

import "./styles.scss";

interface IProps {
    text?: string;
    title?: string;
    buttonText?: string;
    onButtonClick: (...args: any[]) => any;
}

const ExampleBlock: IFunctionalBlock<IProps> = ({
    title = "Example Title",
    text = "Example Text",
    buttonText = "Example Button",
    onButtonClick
}) => (
    <Group title={title}>
        <Div>
            <span className="text">{text}</span>
            <Button
                level="primary"
                size="m"
                stretched={true}
                onClick={onButtonClick}
            >
                {buttonText}
            </Button>
        </Div>
    </Group>
);

export default ExampleBlock;
