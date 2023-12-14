import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import { REGISTER_ROUTE } from "../../constants/routes";

const SignupButton = () => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => () => navigate(route);
  return <MyButton text={"Get Started"} url={REGISTER_ROUTE} isArrow={true} />;
};
export default SignupButton;
