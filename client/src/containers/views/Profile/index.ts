import { connect } from "react-redux";
import ProfileView, { IStateProps } from "@/components/views/Profile";

const mapStateToProps = ({ account, subscriptions }): IStateProps => ({
  currentUser: account && account.user,
  subscriptionCards: subscriptions && subscriptions.subscriptionsArray
});

export default connect(mapStateToProps)(ProfileView);
