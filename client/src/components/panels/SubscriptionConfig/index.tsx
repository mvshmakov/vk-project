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
    FormStatus,
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

export interface IActionsProps {
    postSubscriptionAction: (...args: any[]) => any;
}

interface IProps {
    id: string;
    onBackButtonClick: () => any;
}

export class SubscriptionConfigPanel extends PurePanel<IActionsProps & IProps, ISubscription> {
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

        isError: null,
        isSubscriptionNameFieldEmpty: null,
        isSubscriptionPriceFieldEmpty: null,
        isSubscriptionPeriodFieldEmpty: null
    };

    onChange(e) {
        const { id, value } = e.currentTarget;

        const { subscriptionName, subscriptionPrice, subscriptionPeriod } = this.state;

        this.setState({ isSubscriptionNameFieldEmpty: subscriptionName.length === 0 });
        this.setState({ isSubscriptionPriceFieldEmpty: subscriptionPrice.length === 0 });
        this.setState({ isSubscriptionPeriodFieldEmpty: subscriptionPeriod.length === 0 });

        this.setState({ [id]: value } as Pick<ISubscription, keyof ISubscription>);
    }

    getReferenceElement = element => {
        const { id, value } = element;

        this.setState({ [id]: value } as Pick<ISubscription, keyof ISubscription>);
    }

    onCheckboxClick = event => {
        const { id, checked } = event.currentTarget;

        if (checked) {
            return this.setState({ [id]: true } as Pick<ISubscription, keyof ISubscription>);
        }
        return this.setState({ [id]: false } as Pick<ISubscription, keyof ISubscription>);
    }

    onSaveButtonClick = () => {
        const {
            subscriptionName,
            subscriptionPrice,
            subscriptionPeriod,
            isSubscriptionNameFieldEmpty,
            isSubscriptionPriceFieldEmpty,
            isSubscriptionPeriodFieldEmpty
        } = this.state;

        this.setState({ isSubscriptionNameFieldEmpty: subscriptionName.length === 0 });
        this.setState({ isSubscriptionPriceFieldEmpty: subscriptionPrice.length === 0 });
        this.setState({ isSubscriptionPeriodFieldEmpty: subscriptionPeriod.length === 0 });

        if (!isSubscriptionNameFieldEmpty && isSubscriptionNameFieldEmpty != null
            && !isSubscriptionPriceFieldEmpty && isSubscriptionPriceFieldEmpty != null
            && !isSubscriptionPeriodFieldEmpty && isSubscriptionPeriodFieldEmpty != null) {
            this.setState({ isError: false });

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

            this.props.postSubscriptionAction(finalObject);
            this.props.onBackButtonClick();
        } else {
            this.setState({ isError: true });
        }
    }

    render() {
        const { id, onBackButtonClick } = this.props;

        const {
            isError,
            contentType,
            subscriptionType,
            subscriptionColor,
            subscriptionPeriod,
            subscriptionBriefDescription,
            isSubscriptionNameFieldEmpty,
            isSubscriptionPriceFieldEmpty,
            isSubscriptionPeriodFieldEmpty
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
                        <FormLayoutGroup
                            top="Название подписки"
                            bottom={isSubscriptionNameFieldEmpty ? "Заполните это поле" : ""}
                        >
                            <Input
                                type="text"
                                getRef={this.getReferenceElement}
                                id="subscriptionName"
                                onChange={this.onChange}
                                status={isSubscriptionNameFieldEmpty == null ? "default"
                                    : (!isSubscriptionNameFieldEmpty ? "valid" : "error")}
                            />
                        </FormLayoutGroup>

                        <FormLayoutGroup className="subscription-config-form__divided">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <InfoRow title="Тип подписки" className="subscription-config-form__inforow-type">
                                    <Select
                                        placeholder=" "
                                        id="subscriptionType"
                                        getRef={this.getReferenceElement}
                                        value={subscriptionType}
                                        onChange={this.onChange}
                                    >
                                        <option value="Demo_1">Demo 1</option>
                                        <option value="Demo_2">Demo 2</option>
                                    </Select>
                                </InfoRow>
                                <InfoRow title="Цвет подписки" className="subscription-config-form__inforow-color">
                                    <Select
                                        placeholder=" "
                                        id="subscriptionColor"
                                        getRef={this.getReferenceElement}
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

                        <FormLayoutGroup top="Краткое описание">
                            <Textarea
                                id="subscriptionBriefDescription"
                                getRef={this.getReferenceElement}
                                value={subscriptionBriefDescription}
                                onChange={this.onChange}
                            />
                        </FormLayoutGroup>

                        <FormLayoutGroup top="Тип контента">
                            <Select
                                placeholder="Выберите тип контента"
                                id="contentType"
                                getRef={this.getReferenceElement}
                                value={contentType}
                                onChange={this.onChange}
                            >
                                <option value="Type_1">Type 1</option>
                                <option value="Type_2">Type 2</option>
                            </Select>
                        </FormLayoutGroup>

                        <FormLayoutGroup top="Дополнительно">
                            <Checkbox id="stickers" onClick={this.onCheckboxClick}>Стикеры</Checkbox>
                            <Checkbox id="privateChat" onClick={this.onCheckboxClick}>Закрытый чат</Checkbox>
                            <Checkbox id="comments" onClick={this.onCheckboxClick}>Комментарии</Checkbox>
                        </FormLayoutGroup>

                        <FormLayoutGroup className="subscription-config-form__divided">
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <InfoRow title="Стоимость, руб." className="subscription-config-form__inforow-price">
                                    <Input
                                        id="subscriptionPrice"
                                        getRef={this.getReferenceElement}
                                        onChange={this.onChange}
                                        status={isSubscriptionPriceFieldEmpty == null ? "default"
                                            : (!isSubscriptionPriceFieldEmpty ? "valid" : "error")}
                                    />
                                </InfoRow>
                                <InfoRow title="Период списания" className="subscription-config-form__inforow-period">
                                    <Select
                                        placeholder=" "
                                        id="subscriptionPeriod"
                                        getRef={this.getReferenceElement}
                                        value={subscriptionPeriod}
                                        onChange={this.onChange}
                                        status={isSubscriptionPeriodFieldEmpty == null ? "default"
                                            : (!isSubscriptionPeriodFieldEmpty ? "valid" : "error")}
                                    >
                                        <option value="monthly">Каждый месяц</option>
                                        <option value="annually">Раз в год</option>
                                    </Select>
                                </InfoRow>

                            </div>
                        </FormLayoutGroup>

                        {isError &&
                            <FormStatus title="Заполните все поля" state="error">
                                Если ты уверен, что заполнил все поля - кликни "Сохранить" ещё раз (баг)
                            </FormStatus>
                        }

                        <Button size="xl" onClick={this.onSaveButtonClick}>Сохранить</Button>
                    </FormLayout>
                </Group>
            </Panel>
        );
    }
}

export default SubscriptionConfigPanel;
