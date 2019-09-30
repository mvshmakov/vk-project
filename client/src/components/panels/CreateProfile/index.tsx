import * as React from "react";
import {
    Link,
    Input,
    Panel,
    Button,
    Select,
    Checkbox,
    Textarea,
    FormLayout,
    FormStatus,
    PanelHeader,
    HeaderButton,
    SelectMimicry,
    FormLayoutGroup,
    IS_PLATFORM_ANDROID,
} from "@vkontakte/vkui";
import "@vkontakte/vkui/dist/vkui.css";

import { IUser } from "@/entities/User";
import { IProfile } from "@/entities/Profile";
import { PurePanel } from "@/utils/typings/Components";

import Icon24Back from "@vkontakte/icons/dist/24/back";
import Icon28ChevronBack from "@vkontakte/icons/dist/28/chevron_back";

import "./styles.scss";

export interface IActionsProps {
    postProfileAction: (...args: any[]) => any;
}

interface IProps {
    id: string;
    currentUser: IUser;
    onBackButtonClick: () => any;
    onSearchGroupClick: () => any;
    onButtonClick: (...args) => any;
}
interface IState {
    isError: boolean;
    isButtonActive: boolean;
    isProfileNameFieldEmpty: boolean;
    isProfileDescriptionFieldEmpty: boolean;
}

export class CreateProfilePanel extends PurePanel<IActionsProps & IProps, IProfile & IState> {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    state = {
        ownerId: null,
        profileName: "",
        profileDescription: "",
        profileСategory: "",
        avatar_url: "",

        isError: null,
        isButtonActive: false,
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
        const { currentUser } = this.props;

        const {
            avatar_url,
            profileName,
            profileСategory,
            profileDescription,
            isProfileNameFieldEmpty,
            isProfileDescriptionFieldEmpty,
        } = this.state;

        this.setState({ isProfileNameFieldEmpty: profileName.length === 0 });
        this.setState({ isProfileDescriptionFieldEmpty: profileDescription.length === 0 });

        if (!isProfileNameFieldEmpty && isProfileNameFieldEmpty != null
            && !isProfileDescriptionFieldEmpty && isProfileDescriptionFieldEmpty != null) {
            this.setState({ isError: false });

            const finalObject: IProfile = {
                ownerId: currentUser._id,
                avatar_url,
                profileName,
                profileСategory,
                profileDescription,
            };

            console.log(finalObject);

            this.props.postProfileAction(finalObject);
            this.props.onButtonClick();
        } else {
            this.setState({ isError: true });
        }
    }

    render() {
        const { id, onBackButtonClick, onSearchGroupClick } = this.props;

        const {
            isError,
            isButtonActive,
            profileСategory,
            profileDescription,
            isProfileNameFieldEmpty,
            isProfileDescriptionFieldEmpty,
        } = this.state;

        return (
            <Panel id={id} theme="white">
                <PanelHeader noShadow left={
                    <HeaderButton onClick={onBackButtonClick}>
                        {IS_PLATFORM_ANDROID ? <Icon24Back /> : <Icon28ChevronBack />}
                    </HeaderButton>
                }>
                    Создание страницы автора
                </PanelHeader>
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
                            placeholder="Выберите тематику"
                            value={profileСategory}
                            id="profileСategory"
                            getRef={this.getReferenceElement}
                            onChange={this.onChange}
                        >
                            <option value="humor">Юмор</option>
                            <option value="sport">Спорт</option>
                            <option value="football">Футбол</option>
                            <option value="art">Искусство</option>
                            <option value="movies">Кино</option>
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
                            disabled
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
