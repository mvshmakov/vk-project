import { connect } from "react-redux";

import FeedView, { IStateProps } from "@/components/views/Feed";
import { Dispatch, bindActionCreators } from "redux";
import { GetFeedAction, getFeedAction } from "@/actions/feed";

const mapDispatchToProps = (dispatch: Dispatch<GetFeedAction>) =>
    bindActionCreators({ getFeedAction }, dispatch);

const mapStateToProps = (state): IStateProps => ({
    feed: state.feed
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedView);
