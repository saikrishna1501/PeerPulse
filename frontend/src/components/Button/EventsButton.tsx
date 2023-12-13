import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import { EVENTS_ROUTE, REGISTER_ROUTE } from "../../constants/routes";

interface Props {
  className?: string;
}

const EventsButton = ({ className }: Props) => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => () => navigate(route);
  return (
    <MyButton
      text={"Events"}
      url={EVENTS_ROUTE}
      className={className}
      isArrow={false}
      color="#9370db"
    />
  );
};
export default EventsButton;
