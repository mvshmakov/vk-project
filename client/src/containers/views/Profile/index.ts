import { connect } from "react-redux";
import ProfileView, { IStateProps } from "@/components/views/Profile";
import { bindActionCreators, Dispatch } from "redux";
import { GetFeedAction, getFeedAction } from "@/actions/feed";

const mapDispatchToProps = (dispatch: Dispatch<GetFeedAction>) =>
    bindActionCreators({ getFeedAction }, dispatch);

const mapStateToProps = (state): IStateProps => ({
    feed: state.feed,
    currentUser: state.account && state.account.user,
    subscriptionCards: state.subscriptions
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
