import * as React from "react";
import { Div, Spinner } from "@vkontakte/vkui";

interface IProps {
    show: boolean;
}

export default ({ show }: IProps) =>
    show ? (
        <Div>
            <Spinner size="regular" />
        </Div>
    ) : null;
