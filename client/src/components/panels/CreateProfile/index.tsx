import * as React from "react";
import {
    Link,
    Input,
    Panel,
    Button,
    Select,
    Checkbox,
    FormLayout,
    PanelHeader,
    SelectMimicry,
    FormLayoutGroup,
    Textarea,
    FormStatus,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { PurePanel } from "@/utils/Components";

import "./styles.scss";
import { IUser } from "@/entities/User";

export interface IActionsProps {
    postUserAction: (...args: any[]) => any;
}

interface IProps {
    id: string;
    onSearchGroupClick: () => any;
    onButtonClick: (...args) => any;
}
interface IState {
    isError: boolean;
    isButtonActive: boolean;
    isProfileNameFieldEmpty: boolean;
    isProfileDescriptionFieldEmpty: boolean;
}

export class CreateProfilePanel extends PurePanel<IActionsProps & IProps, IUser & IState> {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    state = {
        id: null,
        username: null,
        email: null,
        role: null,

        profileName: "",
        profileDescription: "",
        category: "",
        avatar_url: "",
        isButtonActive: false,

        isError: null,
        isProfileNameFieldEmpty: null,
        isProfileDescriptionFieldEmpty: null,
    };

    getReferenceElement = element => {
        if (element) {
            const { id, value } = element;

            this.setState({ [id]: value } as Pick<IState, keyof IState>);
        }
    }

    onChange(e) {
        const { id, value } = e.currentTarget;

        const { profileName, profileDescription } = this.state;

        this.setState({ [id]: value } as Pick<IState, keyof IState>);

        this.setState({ isProfileNameFieldEmpty: profileName.length === 0 });
        this.setState({ isProfileDescriptionFieldEmpty: profileDescription.length === 0 });
    }

    onCheckboxClick = event => {
        if (event.currentTarget.checked) {
            return this.setState({ isButtonActive: true });
        }
        return this.setState({ isButtonActive: false });
    }

    onSaveButtonClick = () => {
        const {
            id,
            role,
            email,
            category,
            username,
            avatar_url,
            profileName,
            profileDescription,
            isProfileNameFieldEmpty,
            isProfileDescriptionFieldEmpty,
        } = this.state;

        this.setState({ isProfileNameFieldEmpty: profileName.length === 0 });
        this.setState({ isProfileDescriptionFieldEmpty: profileDescription.length === 0 });

        if (!isProfileNameFieldEmpty && isProfileNameFieldEmpty != null
            && !isProfileDescriptionFieldEmpty && isProfileDescriptionFieldEmpty != null) {
            this.setState({ isError: false });

            const finalObject: IUser = {
                id,
                role,
                email,
                category,
                username,
                avatar_url,
                profileName,
                profileDescription,
            };

            console.log(finalObject);

            // this.props.postUserAction(finalObject);
            this.props.onButtonClick();
        } else {
            this.setState({ isError: true });
        }
    }

    render() {
        const { id, onSearchGroupClick } = this.props;

        const {
            isError,
            category,
            isButtonActive,
            profileDescription,
            isProfileNameFieldEmpty,
            isProfileDescriptionFieldEmpty,
        } = this.state;

        return (
            <Panel id={id}>
                <PanelHeader noShadow>Создание страницы автора</PanelHeader>
                <FormLayout>
                    <FormLayoutGroup
                        top="Название профиля"
                        bottom={isProfileNameFieldEmpty ? "Заполните это поле" : ""}
                    >
                        <Input
                            id="profileName"
                            getRef={this.getReferenceElement}
                            onChange={this.onChange}
                            status={isProfileNameFieldEmpty == null ? "default"
                                : (!isProfileNameFieldEmpty ? "valid" : "error")}
                        />
                    </FormLayoutGroup>

                    <FormLayoutGroup top="Тематика контента">
                        <Select
                            value={category}
                            id="profileСategory"
                            onChange={this.onChange}
                            getRef={this.getReferenceElement}
                            placeholder="Выберите тематику"
                        >
                            <option value="hse">НИУ ВШЭ (ГУ-ВШЭ)</option>
                            <option value="miet">МИЭТ</option>
                        </Select>
                    </FormLayoutGroup>

                    <FormLayoutGroup
                        top="Описание профиля"
                        bottom={isProfileDescriptionFieldEmpty ? "Заполните это поле" : ""}
                    >
                        <Textarea
                            id="profileDescription"
                            getRef={this.getReferenceElement}
                            value={profileDescription}
                            onChange={this.onChange}
                            status={isProfileDescriptionFieldEmpty == null ? "default"
                                : (!isProfileDescriptionFieldEmpty ? "valid" : "error")}
                        />
                    </FormLayoutGroup>

                    <FormLayoutGroup
                        top="Ссылка на аватарку))0)"
                    >
                        <Input
                            id="avatar_url"
                            getRef={this.getReferenceElement}
                            onChange={this.onChange}
                        />
                    </FormLayoutGroup>

                    <FormLayoutGroup top="Основная группа Вконтакте">
                        <SelectMimicry
                            disabled={true}
                            placeholder="Выберите группу"
                            // onClick={onSearchGroupClick}
                            onChange={this.onChange}
                        />
                    </FormLayoutGroup>

                    <Checkbox onClick={this.onCheckboxClick}>
                        Я прочитал и согласен с{" "}
                        <Link href="#">правилами</Link>
                    </Checkbox>

                    {isError &&
                        <FormStatus title="Заполните все поля" state="error">
                            Если ты уверен, что заполнил все поля - кликни "Сохранить" ещё раз (баг)
                            </FormStatus>
                    }

                    <Button
                        size="xl"
                        stretched={true}
                        onClick={this.onSaveButtonClick}
                        level={
                            isButtonActive
                                ? "primary"
                                : "secondary"
                        }
                    >
                        Создать страницу автора
                    </Button>
                </FormLayout>
            </Panel>
        );
    }
}

export default CreateProfilePanel;
