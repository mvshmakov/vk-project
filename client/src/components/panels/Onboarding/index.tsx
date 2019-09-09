import * as React from "react";
import {
    Panel,
    PanelHeader,
    FormLayout,
    Select,
    SelectMimicry,
    Button,
    Checkbox,
    Link
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { PurePanel } from "@/utils/Components";

import "./styles.scss";

interface IProps {
    id: string;
    onSearchGroupClick: () => any;
    onButtonClick: (...args) => any;
}
interface IState {
    isButtonActive: boolean;
}

export class OnboardingPanel extends PurePanel<IProps, IState> {
    state = {
        isButtonActive: false
    };

    onCheckboxClick = event => {
        if (event.currentTarget.checked) {
            return this.setState({ isButtonActive: true });
        }
        return this.setState({ isButtonActive: false });
    }

    render() {
        const { id, onSearchGroupClick, onButtonClick } = this.props;

        return (
            <Panel id={id}>
                <PanelHeader noShadow>VK Project</PanelHeader>
                <div className="header">Начнём</div>
                <div className="text">
                    Выберите своё учебное заведение и академическую
                    группу
                </div>
                <FormLayout>
                    <Select top="ВУЗ" placeholder="Выберите ВУЗ">
                        <option value="hse">НИУ ВШЭ (ГУ-ВШЭ)</option>
                        <option value="miet">МИЭТ</option>
                    </Select>
                    <SelectMimicry
                        top="Группа"
                        placeholder="Выберите Группу"
                        onClick={onSearchGroupClick}
                    />
                    <Checkbox onClick={this.onCheckboxClick}>
                        Я прочитал и согласен с{" "}
                        <Link href="#">правилами</Link>
                    </Checkbox>
                    <Button
                        size="xl"
                        stretched={true}
                        // onClick={onButtonClick}
                        level={
                            this.state.isButtonActive
                                ? "primary"
                                : "secondary"
                        }
                    >
                        Готово
                    </Button>
                </FormLayout>
            </Panel>
        );
    }
}

export default OnboardingPanel;
