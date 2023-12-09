import { Link } from "react-router-dom";
import  {AUTH_ROUTE}  from "../../constants/routes";

export const LoginRequiredPage = () => (
    <div>
      <p>To view this content, please log in.</p>
      <Link to={AUTH_ROUTE}>Go to Login Page</Link>
    </div>
  );