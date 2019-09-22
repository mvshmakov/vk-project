import { connect } from "react-redux";
import ProfileView, { IStateProps } from "@/components/views/Profile";

const mapStateToProps = ({ account, subscriptions }): IStateProps => ({
  currentUser: account.user,
  subscriptionCards: subscriptions
});

export default connect(mapStateToProps)(ProfileView);
