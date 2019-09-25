import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { postSubscriptionAction, PostSubscriptionAction } from "@/actions/subscription";
import SubscriptionConfigPanel, { IActionsProps } from "@/components/panels/SubscriptionConfig";

const mapDispatchToProps = (dispatch: Dispatch<PostSubscriptionAction>): IActionsProps =>
    bindActionCreators({ postSubscriptionAction }, dispatch);

export default connect(data => data, mapDispatchToProps)(SubscriptionConfigPanel);
