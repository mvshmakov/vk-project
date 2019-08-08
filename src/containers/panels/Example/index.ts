import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { exampleAction } from "@/actions/example";
import ExamplePanel from "@/components/panels/Example";

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ exampleAction }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(ExamplePanel);
