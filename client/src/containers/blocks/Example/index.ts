import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { exampleAction } from "@/actions/example";
import ExampleBlock from "@/components/blocks/Example";

const mapDispatchToProps = dispatch =>
    bindActionCreators({ exampleAction }, dispatch);

export default connect(
    null,
    mapDispatchToProps
)(ExampleBlock);
