import { useNavigate } from "react-router-dom";
import headerImg from "../assets/header-img.png";
import "./Main.css";

function Main() {
  const navigate = useNavigate();

  return (
    <>
      <img
        className="header-img"
        onClick={() => {
          navigate("/festivals");
        }}
        src={headerImg}
        alt="메인 이미지"
      />
    </>
  );
}

export default Main;
