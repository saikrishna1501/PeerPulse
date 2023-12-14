import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import {
  EVENTS_ROUTE,
  HOUSING_ROUTE,
  REGISTER_ROUTE,
} from "../../constants/routes";

interface Props {
  className?: string;
}

const HousingButton = ({ className }: Props) => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => () => navigate(route);
  return (
    <MyButton
      text={"Housing"}
      url={HOUSING_ROUTE}
      className={className}
      isArrow={false}
      color="#000000"
    />
  );
};
export default HousingButton;
