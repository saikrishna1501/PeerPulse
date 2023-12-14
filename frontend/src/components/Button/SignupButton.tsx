import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import { REGISTER_ROUTE } from "../../constants/routes";
import { useSelector } from "react-redux";

import getLanguageObject from "../../utils/getLanguageObject";



const SignupButton = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  const languageSelector = useSelector((state:any)=> state.language.selectedLanguage);
  const choosenLanguage: any = getLanguageObject(languageSelector);

  const navigateTo = (route: string) => () => navigate(route);

  if(!isAuthenticated){
    return <MyButton text={"Get Started"} url={REGISTER_ROUTE} isArrow={true} />
  }
  return (<></>)

};
export default SignupButton;