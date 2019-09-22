import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { searchUserAction, SearchUserAction } from "@/actions/search";
import SearchPanel, { IStateProps, IActionsProps } from "@/components/panels/Search";

const mapStateToProps = ({ users, loading }): IStateProps => ({ users, loading });

const mapDispatchToProps = (dispatch: Dispatch<SearchUserAction>): IActionsProps =>
    bindActionCreators({ searchUserAction }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPanel);
