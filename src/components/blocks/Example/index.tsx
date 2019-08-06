import * as React from "react";
import { Group, Div, Button } from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import "./styles.scss";

interface IProps {
    text?: string;
    title?: string;
    buttonText?: string;
    onButtonClick: (...args) => any;
}

export default ({
    title = "Example Title",
    text = "Example Text",
    buttonText = "Example Button",
    onButtonClick
}: IProps) => (
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
