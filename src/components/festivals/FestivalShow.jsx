import { useNavigate, useParams } from "react-router-dom";
import "./FestivalShow.css";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { useEffect } from "react";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice.js";

function FestivalShow() {
  const params = useParams(); // segment param 다 가져오기
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const festivalInfo = useSelector((state) => state.festivalShow.festivalInfo);
  const festivalList = useSelector((state) => state.festival.list);
  const item = festivalList.find((item) => params.id === item.contentid);

  dispatch(setFestivalInfo(item));
  useEffect(() => {}, []);
  function redirectBack() {
    navigate(-1);
  }
  return (
    <>
      {festivalInfo.title && (
        <div className="show-container">
          <img
            src={festivalInfo.firstimage}
            alt={`${festivalInfo.title} 이미지`}
            className="show-img"
          />
          <div className="festival-info-container">
            <p className="show-title">{festivalInfo.title}</p>
            <p className="show-period">
              {dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~{" "}
              {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}
            </p>
            <p className="show-addr">{`${festivalInfo.addr1}, ${festivalInfo.addr2}`}</p>
          </div>
          <div className="festivalShowBtnContainer">
            <button
              type="button"
              className="stayRedirectBtn"
              onClick={() => navigate("/stays")}
            >
              <span className="stayRedirectBtnContent">숙박 알아보기</span>
            </button>
            <button
              type="button"
              onClick={redirectBack}
              className="festivalShowbackBtn"
            >
              되돌아가기
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default FestivalShow;
