import { connect } from "react-redux";
import { TStore } from "@/store";
import SettingsView from "@/components/views/Settings";

const mapStateToProps = ({ account }: TStore) => ({ user: account.user });

export default connect(mapStateToProps)(SettingsView);
