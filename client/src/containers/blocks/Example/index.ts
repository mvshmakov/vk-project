import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";

import { exampleAction, TExampleActions } from "@/actions/example";
import ExampleBlock from "@/components/blocks/Example";

const mapDispatchToProps = (dispatch: Dispatch<TExampleActions>) =>
    bindActionCreators({ exampleAction }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(ExampleBlock);
