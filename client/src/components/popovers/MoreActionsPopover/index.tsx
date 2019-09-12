import * as React from "react";
import { ActionSheet, ActionSheetItem, platform, IOS } from "@vkontakte/vkui";

import "./styles.scss";

interface IProps {
    onUpdateVisibility: Function;
}

const osname = platform();

export class MoreActionsPopover extends React.Component<IProps> {
    constructor(props) {
        super(props);

        this.updateVisibility = this.updateVisibility.bind(this);
    }

    updateVisibility = () => {
        this.props.onUpdateVisibility(false);
    }

    render() {
        return (
            <ActionSheet onClose={() => this.updateVisibility()}>
                <ActionSheetItem autoclose>
                    Скопировать
                    </ActionSheetItem>
                <ActionSheetItem autoclose>
                    Изменить
                    </ActionSheetItem>
                <ActionSheetItem autoclose>
                    Удалить
                    </ActionSheetItem>
                {osname === IOS && <ActionSheetItem autoclose theme="cancel">Отменить</ActionSheetItem>}
            </ActionSheet>
        );
    }
}
