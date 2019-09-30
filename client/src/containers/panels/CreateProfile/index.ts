import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";

import { postProfileAction, PostProfileAction } from "@/actions/profiles";
import CreateProfilePanel, { IActionsProps } from "@/components/panels/CreateProfile";

const mapDispatchToProps = (dispatch: Dispatch<PostProfileAction>): IActionsProps =>
    bindActionCreators({ postProfileAction }, dispatch);

export default connect(null, mapDispatchToProps)(CreateProfilePanel);
