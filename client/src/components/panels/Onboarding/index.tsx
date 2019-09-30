import * as React from "react";
import {
    Div,
    Panel,
    Group,
    Separator,
    PanelHeader,
    Avatar,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";
import Icon36Add from "@vkontakte/icons/dist/36/add";

import { PurePanel } from "@/utils/typings/Components";
import { IUser } from "@/entities/User";

import "./styles.scss";

interface IProps {
    id: string;
    currentUser: IUser;
    onCreateSubscriberClick: (...args) => any;
    onCreateContentMakerClick: (...args) => any;
}

export class OnboardingPanel extends PurePanel<IProps, null> {

    render() {
        const { id, currentUser, onCreateSubscriberClick, onCreateContentMakerClick } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader noShadow>Продолжить в качестве...</PanelHeader>
                <Group className="onboarding-panel">
                    <Div onClick={onCreateSubscriberClick}>
                        <div className="onboarding-panel__subscriber">
                            <div className="onboarding-panel__subscriber-content">
                                <Avatar
                                    src={currentUser && currentUser.photo_100}
                                    style={{ marginBottom: "10px" }}
                                    size={80}
                                />
                                {currentUser && (currentUser.first_name + " " + currentUser.last_name)}
                            </div>
                            Я пользователь
                        </div>
                    </Div>

                    <Separator style={{ margin: "12px 0" }} />

                    <Div onClick={onCreateContentMakerClick}>
                        <div className="onboarding-panel__content-maker">
                            <div className="onboarding-panel__content-maker-content">
                                <Icon36Add />
                            </div>
                            Я автор и хочу создать страницу
                        </div>
                    </Div>
                </Group>
            </Panel>
        );
    }
}

export default OnboardingPanel;
