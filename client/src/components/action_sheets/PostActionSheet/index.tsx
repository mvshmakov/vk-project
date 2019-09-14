import * as React from "react";
import { ActionSheet, ActionSheetItem, IS_PLATFORM_IOS } from "@vkontakte/vkui";

import "./styles.scss";

interface IProps {
    onUpdateVisibility: (value: boolean) => void;
}

// TODO: change to React.PureComponent
export class PostActionSheet extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    updateVisibility = () => {
        this.props.onUpdateVisibility(false);
    }

    render() {
        return (
            <ActionSheet onClose={this.updateVisibility}>
                <ActionSheetItem autoclose>
                    Скопировать ссылку
                    </ActionSheetItem>
                <ActionSheetItem autoclose>
                    Добавить в избранное
                    </ActionSheetItem>
                <ActionSheetItem autoclose>
                    Пожаловаться
                    </ActionSheetItem>
                {IS_PLATFORM_IOS && <ActionSheetItem autoclose theme="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        );
    }
}
