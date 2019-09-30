import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { TStore } from "@/store";
import { searchUserAction, SearchUserAction } from "@/actions/search";
import SearchPanel from "@/components/panels/Search";

const mapStateToProps = ({ users, loading }: TStore) => ({ users, loading });

const mapDispatchToProps = (dispatch: Dispatch<SearchUserAction>) =>
    bindActionCreators({ searchUserAction }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchPanel);
