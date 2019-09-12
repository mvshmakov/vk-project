import * as React from "react";
import {
    List,
    Cell,
    InfoRow,
    ModalRoot,
    ModalPage,
    HeaderButton,
    ModalPageHeader,
    IS_PLATFORM_IOS,
    IS_PLATFORM_ANDROID,
} from "@vkontakte/vkui";
import Icon24Dismiss from "@vkontakte/icons/dist/24/dismiss";
import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";

import "./styles.scss";

interface IProps {
    onUpdateVisibility: Function;
}

export class AdditionalInfoPopover extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    updateVisibility = () => {
        this.props.onUpdateVisibility(false);
    }

    render() {
        const profileMocks = {
            name: "Sports.Ru",
            category: "Спорт, Интернет-СМИ",
            description: "Sports.Ru - ведущий российский спортивный сайт, обладающий аудиторией более 14 млн. человек...",
        };

        return (
            <ModalRoot activeModal={"ADDITIONAL_INFO_MODAL"}>
                <ModalPage
                    id={"ADDITIONAL_INFO_MODAL"}
                    header={
                        <ModalPageHeader
                            left={IS_PLATFORM_ANDROID && <HeaderButton onClick={() => this.updateVisibility()}><Icon24Cancel /></HeaderButton>}
                            right={IS_PLATFORM_IOS && <HeaderButton onClick={() => this.updateVisibility()}><Icon24Dismiss /></HeaderButton>}
                        >
                            Подробная информация
                        </ModalPageHeader>
                    }
                    onClose={() => this.setState({ activeModal: null })}
                >
                    <List>
                        <Cell>
                            <InfoRow title="Название канала">
                                {profileMocks.name}
                            </InfoRow>
                        </Cell>
                        <Cell>
                            <InfoRow title="Категория">
                                {profileMocks.category}
                            </InfoRow>
                        </Cell>
                        <Cell>
                            <InfoRow title="Описание">
                                {profileMocks.description}
                            </InfoRow>
                        </Cell>
                    </List>
                </ModalPage>
            </ModalRoot>
        );
    }
}
