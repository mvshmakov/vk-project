import * as React from "react";
import { Panel, PanelHeader, HeaderButton } from "@vkontakte/vkui";
import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";
import "@vkontakte/vkui/dist/vkui.css";

import { isAndroid } from "@/helpers/vkui";
import { IFunctionalPanel } from "@/typings/Components";

import "./styles.scss";

interface IProps {
    id: string;
    onBackClick: (...args: any[]) => any;
}

export const LessonDescriptionPanel: IFunctionalPanel<IProps> = ({
    id,
    onBackClick
}: IProps) => (
    <Panel id={id}>
        <PanelHeader
            left={
                <HeaderButton onClick={onBackClick}>
                    {isAndroid() ? <Icon24Back /> : <Icon28ChevronBack />}
                </HeaderButton>
            }
            noShadow
        >
            Пара
        </PanelHeader>
    </Panel>
);

export default LessonDescriptionPanel;
