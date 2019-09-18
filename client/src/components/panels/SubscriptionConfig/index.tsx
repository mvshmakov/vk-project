import * as React from "react";
import {
    Panel,
    Group,
    Input,
    Header,
    Button,
    Select,
    InfoRow,
    Textarea,
    Checkbox,
    FormLayout,
    PanelHeader,
    HeaderButton,
    FormLayoutGroup,
    IS_PLATFORM_ANDROID,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";

import { PurePanel } from "@/utils/Components";

import "./styles.scss";
import { ISubscription } from "@/entities/Subscription";
import { postSubscription } from "@/api/subscriptions";

interface IProps {
    id: string;
    onBackButtonClick: () => any;
}

export class SubscriptionConfigPanel extends PurePanel<IProps, ISubscription> {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    state = {
        subscriptionName: "",
        subscriptionType: "",
        subscriptionColor: "",
        subscriptionBriefDescription: "",
        contentType: "",
        subscriptionPrice: "",
        subscriptionPeriod: "",
        stickers: false,
        privateChat: false,
        comments: false,
    };

    onChange(e) {
        const { name, value } = e.currentTarget;

        this.setState({ [name]: value } as Pick<ISubscription, keyof ISubscription>);
    }

    onCheckboxClick = event => {
        const { name, checked } = event.currentTarget;

        if (checked) {
            return this.setState({ [name]: true } as Pick<ISubscription, keyof ISubscription>);
        }
        return this.setState({ [name]: false } as Pick<ISubscription, keyof ISubscription>);
    }

    onSaveButtonClick = () => {
        for (let key in this.state) {
            console.log(this.state[key], (document.getElementsByName(String(key))[0] as any).value);
            // this.state[key] = (document.getElementsByName(String(key))[0] as any).defaultValue;
        }

        const finalObject = {
            subscriptionName: this.state.subscriptionName,
            subscriptionType: this.state.subscriptionType,
            subscriptionColor: this.state.subscriptionColor,
            subscriptionBriefDescription: this.state.subscriptionBriefDescription,
            contentType: this.state.contentType,
            subscriptionPrice: this.state.subscriptionPrice,
            subscriptionPeriod: this.state.subscriptionPeriod,
            stickers: this.state.stickers,
            privateChat: this.state.privateChat,
            comments: this.state.comments,
        };

        // TODO: some post actions to db
        postSubscription(finalObject).then(res => console.log(res));
    }

    render() {
        const { id, onBackButtonClick } = this.props;

        const {
            subscriptionName,
            subscriptionType,
            subscriptionColor,
            subscriptionBriefDescription,
            contentType,
            subscriptionPrice,
            subscriptionPeriod
        } = this.state;

        return (
            <Panel id={id}>
                <PanelHeader noShadow left={
                    <HeaderButton onClick={onBackButtonClick}>
                        {IS_PLATFORM_ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                    </HeaderButton>
                }></PanelHeader>
                <Group>
                    <Header>
                        Конфигурация подписки
                    </Header>
                    <FormLayout className="subscription-config-form">
                        <Input
                            type="text"
                            top="Название подписки"
                            name="subscriptionName"
                            value={subscriptionName}
                            onChange={this.onChange}
                            status={subscriptionName ? "valid" : "error"}
                            bottom={!subscriptionName ? "Заполните это поле" : ""}
                        />

                        <FormLayoutGroup className="subscription-config-form__divided">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <InfoRow title="Тип подписки" className="subscription-config-form__inforow-type">
                                    <Select
                                        defaultValue="Demo_2"
                                        name="subscriptionType"
                                        value={subscriptionType}
                                        onChange={this.onChange}
                                    >
                                        <option value="Demo_1">Demo 1</option>
                                        <option value="Demo_2">Demo 2</option>
                                    </Select>
                                </InfoRow>
                                <InfoRow title="Цвет подписки" className="subscription-config-form__inforow-color">
                                    <Select
                                        defaultValue="Turquoise"
                                        name="subscriptionColor"
                                        value={subscriptionColor}
                                        onChange={this.onChange}
                                    >
                                        <option value="Turquoise">Turquoise</option>
                                        <option value="Mustard">Mustard</option>
                                        <option value="Lilac">Lilac</option>
                                    </Select>
                                </InfoRow>
                            </div>
                        </FormLayoutGroup>

                        <Textarea
                            top="Краткое описание"
                            name="subscriptionBriefDescription"
                            value={subscriptionBriefDescription}
                            onChange={this.onChange}
                        />

                        <Select
                            top="Тип контента"
                            placeholder="Выберите тип контента"
                            name="contentType"
                            value={contentType}
                            onChange={this.onChange}
                        >
                            <option value="Type_1">Type 1</option>
                            <option value="Type_2">Type 2</option>
                        </Select>

                        <FormLayoutGroup top="Дополнительно">
                            <Checkbox id="stickers" onClick={this.onCheckboxClick}>Стикеры</Checkbox>
                            <Checkbox id="privateChat" onClick={this.onCheckboxClick}>Закрытый чат</Checkbox>
                            <Checkbox id="comments" onClick={this.onCheckboxClick}>Комментарии</Checkbox>
                        </FormLayoutGroup>

                        <FormLayoutGroup className="subscription-config-form__divided">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <InfoRow title="Стоимость, руб." className="subscription-config-form__inforow-price">
                                    <Input
                                        name="subscriptionPrice"
                                        value={subscriptionPrice}
                                        onChange={this.onChange}
                                        status={subscriptionPrice ? "valid" : "error"}
                                        bottom={!subscriptionPrice ? "Заполните это поле" : ""}
                                    />
                                </InfoRow>
                                <InfoRow title="Период списания" className="subscription-config-form__inforow-period">
                                    <Select
                                        defaultValue="monthly"
                                        name="subscriptionPeriod"
                                        value={subscriptionPeriod}
                                        onChange={this.onChange}
                                    >
                                        <option value="monthly">Каждый месяц</option>
                                        <option value="annually">Раз в год</option>
                                    </Select>
                                </InfoRow>

                            </div>
                        </FormLayoutGroup>

                        <Button size="xl" onClick={this.onSaveButtonClick}>Сохранить</Button>
                    </FormLayout>
                </Group>
            </Panel>
        );
    }
}

export default SubscriptionConfigPanel;
