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
import { profileMocks } from "@/components/views/Profile/__mocks__";

interface IProps {
    onUpdateVisibility: (value: boolean) => void;
}

// TODO: change to React.PureComponent
export class AdditionalInfoModal extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    updateVisibility = () => {
        this.props.onUpdateVisibility(false);
    }

    render() {
        const modalPageHeader = (
            <ModalPageHeader
                left={IS_PLATFORM_ANDROID && <HeaderButton onClick={this.updateVisibility}><Icon24Cancel /></HeaderButton>}
                right={IS_PLATFORM_IOS && <HeaderButton onClick={this.updateVisibility}><Icon24Dismiss /></HeaderButton>}
            >
                Подробная информация
            </ModalPageHeader>
        );

        return (
            <ModalRoot activeModal={"ADDITIONAL_INFO_MODAL"}>
                <ModalPage
                    id="ADDITIONAL_INFO_MODAL"
                    header={modalPageHeader}
                    onClose={this.updateVisibility}
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
