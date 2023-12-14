import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import { REGISTER_ROUTE } from "../../constants/routes";
import { useSelector } from "react-redux";
import getLanguageObject from "../../utils/getLanguageObject";


const SignupButton = () => {
  const navigate = useNavigate();

  const languageSelector = useSelector((state:any)=> state.language.selectedLanguage);
  const choosenLanguage: any = getLanguageObject(languageSelector);

  const navigateTo = (route: string) => () => navigate(route);
  return <MyButton text={choosenLanguage.LandingPage4} url={REGISTER_ROUTE} isArrow={true} />;
};
export default SignupButton;
