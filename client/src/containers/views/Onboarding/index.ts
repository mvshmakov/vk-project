import { connect } from "react-redux";
import OnboardingView, { IStateProps } from "@/components/views/Onboarding";

const mapStateToProps = ({ account }): IStateProps => ({ currentUser: account.user });

export default connect(mapStateToProps)(OnboardingView);
