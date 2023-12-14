import { Button, Typography } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";

interface Props {
  text: string;
  url: string;
  className?: string;
  isArrow: boolean;
  color?: string;
}

const MyButton = ({ text, url, className, isArrow, color }: Props) => {
  const navigate = useNavigate();

  color = !!color ? color : "#6161FF";

  const navigateTo = (route: string) => () => {
    navigate(route);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <Button
      onClick={navigateTo(url)}
      className={className}
      variant="contained"
      sx={{
        fontWeight: "bold",
        borderRadius: "25px",
        height: "50px",
        width: "180px",
        position: "sticky",
        backgroundColor: color,
        top: 100,
      }}
    >
      <Typography
        sx={{
          marginLeft: 1,
          fontSize: "14px",
          fontWeight: "bold",
          paddingRight: "2px",
        }}
      >
        {text}
      </Typography>
      {isArrow && <ArrowCircleRightIcon />}
    </Button>
  );
};
export default MyButton;
