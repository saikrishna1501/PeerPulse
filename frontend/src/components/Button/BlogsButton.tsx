import { useNavigate } from "react-router-dom";
import MyButton from "./Button";
import {
  BLOGS_ROUTE,
  EVENTS_ROUTE,
  REGISTER_ROUTE,
} from "../../constants/routes";

interface Props {
  className?: string;
}

const BlogsButton = ({ className }: Props) => {
  const navigate = useNavigate();

  const navigateTo = (route: string) => () => navigate(route);
  return (
    <MyButton
      text={"Blogs"}
      url={BLOGS_ROUTE}
      className={className}
      isArrow={false}
      color="#1e90FF"
    />
  );
};
export default BlogsButton;
