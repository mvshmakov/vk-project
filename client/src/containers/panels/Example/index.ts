import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { exampleAction, TExampleActions } from "@/actions/example";
import ExamplePanel from "@/components/panels/Example";

const mapDispatchToProps = (dispatch: Dispatch<TExampleActions>) =>
    bindActionCreators({ exampleAction }, dispatch);

export default connect(null, mapDispatchToProps)(ExamplePanel);
