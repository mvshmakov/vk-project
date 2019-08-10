import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { searchUserAction } from "@/actions/search";
import SearchPanel, { IStateProps, IActionsProps } from "@/components/panels/Search";

const mapStateToProps = ({ users, loading }): IStateProps => ({ users, loading });

// TODO: types for dispatch
const mapDispatchToProps = (dispatch): IActionsProps =>
    bindActionCreators({ searchUserAction }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPanel);
