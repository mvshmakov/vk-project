import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { TStore } from "@/store";
import { TFeedActions, getFeedAction } from "@/actions/feed";
import ProfileView from "@/components/views/Profile";

const mapDispatchToProps = (dispatch: Dispatch<TFeedActions>) =>
    bindActionCreators({ getFeedAction }, dispatch);

const mapStateToProps = (state: TStore) => ({
    feed: state.feed,
    currentUser: state.account && state.account.user,
    subscriptionCards: state.subscriptions
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
