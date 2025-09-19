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
          <button type="button" onClick={redirectBack}>
            되돌아가기
          </button>
          <p className="show-title">{festivalInfo.title}</p>
          <p className="show-period">
            {dateFormatter.withHyphenYMD(festivalInfo.eventstartdate)} ~{" "}
            {dateFormatter.withHyphenYMD(festivalInfo.eventenddate)}
          </p>
          <img
            src={festivalInfo.firstimage}
            alt={`${festivalInfo.title} 이미지`}
            className="show-img"
          />
          <p className="show-addr">{`${festivalInfo.addr1}, ${festivalInfo.addr2}`}</p>
          <button
            type="button"
            className="stayRedirectBtn"
            onClick={() => navigate("/festivalStays")}
          >
            <span className="stayRedirectBtnContent">
              숙박 찾으러 가기(☞ﾟヮﾟ)☞
            </span>
          </button>
        </div>
      )}
    </>
  );
}

export default FestivalShow;
