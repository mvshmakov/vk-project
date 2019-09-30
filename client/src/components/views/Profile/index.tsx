import * as React from "react";
import { View } from "@vkontakte/vkui";

import { IUser } from "@/entities/User";
import { IPost } from "@/entities/Post";
import { IProfile } from "@/entities/Profile";
import { ISubscription } from "@/entities/Subscription";
import { PureView } from "@/utils/typings/Components";
import AccountPanel from "@/components/panels/AccountPanel";
import { ProfilePanel } from "@/components/panels/ProfilePanel";
import { PostActionSheet } from "@/components/blocks/PostActionSheet";
import { SubscriptionPopout } from "@/components/blocks/SubscriptionPopout";
import { AdditionalInfoModal } from "@/components/blocks/AdditionalInfoModal";
import SubscriptionConfigPanel from "@/containers/panels/SubscriptionConfig";

import "./styles.scss";

export interface IStateProps {
    feed: IPost[];
    currentUser: IUser;
    currentProfile: IProfile;
    subscriptionCards: ISubscription[];
}

interface IProps {
    id: string;
    getFeedAction: (...args) => {};
}

interface IState {
    mode: string;
    activePanel: string;
    isModalShown: boolean;
    isPopupShown: boolean;
    contextOpened: boolean;
    isActionSheetShown: boolean;
    subscriptionSlideIndex: number;
}

export default class ProfileView extends PureView<IProps & IStateProps, IState> {
    constructor(props: IProps & IStateProps) {
        super(props);

        this.toggleContext = this.toggleContext.bind(this);
        this.selectHeaderMode = this.selectHeaderMode.bind(this);
        this.onUpdateElementVisibility = this.onUpdateElementVisibility.bind(this);
    }

    state = {
        mode: "account",
        activePanel: "account",
        isModalShown: false,
        isPopupShown: false,
        contextOpened: false,
        isActionSheetShown: false,
        subscriptionSlideIndex: null,
    };

    componentWillMount(): void {
        this.props.getFeedAction();
    }

    onUpdateElementVisibility = (elem: string, visible: boolean) => {
        if (elem === "modal") {
            this.setState({ isModalShown: visible });
        } else if (elem === "popup") {
            this.setState({ isPopupShown: visible });
        } else {
            this.setState({ isActionSheetShown: visible });
        }
    }

    onSlideChange = (slideIndex: number) => {
        this.setState({ subscriptionSlideIndex: slideIndex });
    }

    onActivePanelChange = (panelId: string) => {
        this.setState({ activePanel: panelId });
    }

    toggleContext() {
        this.setState({ contextOpened: !this.state.contextOpened });
    }

    selectHeaderMode(e) {
        const mode = e.currentTarget.dataset.mode;
        this.setState({ mode, activePanel: mode });
        requestAnimationFrame(this.toggleContext);
    }

    render() {
        const { feed, currentUser, currentProfile, subscriptionCards } = this.props;

        const {
            mode,
            activePanel,
            isModalShown,
            isPopupShown,
            contextOpened,
            isActionSheetShown,
        } = this.state;

        const activePopover = () => {
            if (isPopupShown) {
                return <SubscriptionPopout onUpdateVisibility={this.onUpdateElementVisibility} />;
            } else if (isActionSheetShown) {
                return <PostActionSheet onUpdateVisibility={this.onUpdateElementVisibility} />;
            } else {
                return null;
            }
        };

        const activeModal = (
            isModalShown ? <AdditionalInfoModal profile={currentProfile} onUpdateVisibility={this.onUpdateElementVisibility} /> : null
        );

        return (
            <View
                id={this.props.id}
                activePanel={activePanel}
                modal={activeModal}
                popout={activePopover()}
                className="profile-view"
            >
                <ProfilePanel
                    id="profile"
                    feed={feed}
                    mode={mode}
                    currentUser={currentUser}
                    contextOpened={contextOpened}
                    selectHeaderMode={this.selectHeaderMode}
                    currentProfile={currentProfile}
                    subscriptionCards={subscriptionCards}
                    toggleContext={this.toggleContext}
                    onSlideChange={this.onSlideChange}
                    onUpdateElementVisibility={this.onUpdateElementVisibility}
                />

                <AccountPanel
                    id="account"
                    mode={mode}
                    currentUser={currentUser}
                    contextOpened={contextOpened}
                    currentProfile={currentProfile}
                    toggleContext={this.toggleContext}
                    selectHeaderMode={this.selectHeaderMode}
                    onActivePanelChange={this.onActivePanelChange}
                />

                <SubscriptionConfigPanel id="config" onBackButtonClick={this.onActivePanelChange} />
            </View>
        );
    }
}
