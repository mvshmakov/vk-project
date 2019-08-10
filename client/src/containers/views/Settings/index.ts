import { connect } from "react-redux";
import SettingsView, { IStateProps } from "@/components/views/Settings";

const mapStateToProps = ({ account }): IStateProps => ({ user: account.user });

export default connect(mapStateToProps)(SettingsView);
