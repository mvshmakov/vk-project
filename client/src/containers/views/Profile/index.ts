import { connect } from "react-redux";
import ProfileView, { IStateProps } from "@/components/views/Profile";

const mapStateToProps = (state): IStateProps => ({
  currentUser: state.account && state.account.user,
  subscriptionCards: state.subscriptions
});

export default connect(mapStateToProps)(ProfileView);
