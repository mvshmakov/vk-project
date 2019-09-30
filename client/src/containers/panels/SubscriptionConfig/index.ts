import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { postSubscriptionAction, PostSubscriptionAction } from "@/actions/subscription";
import SubscriptionConfigPanel from "@/components/panels/SubscriptionConfig";

const mapDispatchToProps = (dispatch: Dispatch<PostSubscriptionAction>) =>
    bindActionCreators({ postSubscriptionAction }, dispatch);

export default connect(null, mapDispatchToProps)(SubscriptionConfigPanel);
