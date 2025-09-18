import { useNavigate } from "react-router-dom";
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
        src="/base/header-img.png"
        alt="메인 이미지"
      />
    </>
  );
}

export default Main;
