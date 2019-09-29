import * as React from "react";
import { View } from "@vkontakte/vkui";

import { IUser } from "@/entities/User";
import { IPost } from "@/entities/Post";
import { IProfile } from "@/entities/Profile";
import { PureView } from "@/utils/Components";
import { ISubscription } from "@/entities/Subscription";
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
    constructor(props) {
        super(props);

        this.toggleContext = this.toggleContext.bind(this);
        this.selectHeaderMode = this.selectHeaderMode.bind(this);
        this.updateModalVisibility = this.updateModalVisibility.bind(this);
        this.updateActionSheetVisibility = this.updateActionSheetVisibility.bind(this);
        this.updateSubscriptionVisibility = this.updateSubscriptionVisibility.bind(this);
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

    updateModalVisibility = (visible: boolean) => {
        this.setState({ isModalShown: visible });
    }

    updateActionSheetVisibility = (visible: boolean) => {
        this.setState({ isActionSheetShown: visible });
    }

    updateSubscriptionVisibility = (visible: boolean) => {
        this.setState({ isPopupShown: visible });
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
                return <SubscriptionPopout onUpdateVisibility={this.updateSubscriptionVisibility} />;
            } else if (isActionSheetShown) {
                return <PostActionSheet onUpdateVisibility={this.updateActionSheetVisibility} />;
            } else {
                return null;
            }
        };

        const activeModal = (
            isModalShown ? <AdditionalInfoModal profile={currentProfile} onUpdateVisibility={this.updateModalVisibility} /> : null
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
                    updateModalVisibility={this.updateModalVisibility}
                    updateActionSheetVisibility={this.updateActionSheetVisibility}
                    updateSubscriptionVisibility={this.updateSubscriptionVisibility}
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
