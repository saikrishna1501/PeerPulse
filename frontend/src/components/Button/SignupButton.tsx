import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import { REGISTER_ROUTE } from "../../constants/routes";
import { useSelector } from "react-redux";

const SignupButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const navigateTo = (route: string) => () => navigate(route);
  if(!isAuthenticated){
    return <MyButton text={"Get Started"} url={REGISTER_ROUTE} isArrow={true} />
  }
  return (<></>)
};
export default SignupButton;