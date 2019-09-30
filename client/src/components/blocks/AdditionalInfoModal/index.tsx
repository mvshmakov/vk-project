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
import { IProfile } from "@/entities/Profile";

interface IProps {
    profile: IProfile | undefined;
    onUpdateVisibility: (elem: string, value: boolean) => void;
}

// TODO: change to React.PureComponent
export class AdditionalInfoModal extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    updateVisibility = () => {
        this.props.onUpdateVisibility("modal", false);
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
                                {this.props.profile && this.props.profile.profileName}
                            </InfoRow>
                        </Cell>
                        <Cell>
                            <InfoRow title="Категория">
                                {this.props.profile && this.props.profile.profileСategory}
                            </InfoRow>
                        </Cell>
                        <Cell>
                            <InfoRow title="Описание">
                                {this.props.profile && this.props.profile.profileDescription}
                            </InfoRow>
                        </Cell>
                    </List>
                </ModalPage>
            </ModalRoot>
        );
    }
}
