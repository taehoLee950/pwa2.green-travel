import { useNavigate, useParams } from "react-router-dom";
import "./FestivalShow.css";
import { useDispatch, useSelector } from "react-redux";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice.js";
import { setSelectedAreaCode } from "../../store/slices/festivalSlice.js";

function FestivalShow() {
  // 파라미터 + 스토어 조회
  const params = useParams();
  const festivalInfo = useSelector((state) => state.festivalShow.festivalInfo);
  const festivalList = useSelector((state) => state.festival.list);
  const item = festivalList.find((item) => params.id === item.contentid);
  const dispatch = useDispatch();

  // navigate 호출
  const navigate = useNavigate();

  // 상세 페이지 state를 FestivalList 클릭 된 요소로 변경
  dispatch(setFestivalInfo(item));

  // 되돌아가기 버튼 함수
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
              onClick={() => {
                dispatch(setSelectedAreaCode(item.areacode));
                navigate("/stays");
              }}
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
