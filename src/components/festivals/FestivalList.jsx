import { useDispatch, useSelector } from "react-redux";
import "./FestivalList.css";
import { useEffect } from "react";
import { festivalIndex } from "../../store/thunks/festivalThunk.js";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { setScrollEventFlg } from "../../store/slices/festivalSlice.js";
import { useNavigate } from "react-router-dom";
import { setFestivalInfo } from "../../store/slices/festivalShowSlice.js";
//read
function FestivalList() {
  const festivalList = useSelector((state) => state.festival.list);
  console.log(festivalList);
  const scrollEventFlg = useSelector((state) => state.festival.scrollEventFlg);
  const dispatch = useDispatch();

  const navigate = useNavigate(); //navigate 불러오기

  useEffect(() => {
    // local storage에 저장된 날짜를 획득
    // 저장된 날짜 없으면 local storage에 현재 날짜 저장
    // 저장된 날짜 있으면 아래 처리 속행
    // 오늘 날짜랑 비교
    //  과거일시 local storage및 state 초기화
    // 아직 과거가 아니면 처리 속행
    window.addEventListener("scroll", addNextPage);

    if (festivalList.length === 0) {
      dispatch(festivalIndex());
    }

    return () => {
      // clean-up function
      window.removeEventListener("scroll", addNextPage);
    };
  }, []);

  // add next page fn
  function addNextPage() {
    // scroll process
    const docHeight = document.documentElement.scrollHeight; //문서의 Y축 총 길이
    const winHeight = window.innerHeight; // 윈도우의 Y축 총 길이
    const nowHeight = Math.ceil(window.scrollY); // 현재 스크롤의 Y축 위치
    const viewHeight = docHeight - winHeight; // 스크롤을 끝까지 내렸을 때의 Y축 위치
    // console.log(winHeight, nowHeight, viewHeight);
    if (viewHeight === nowHeight && scrollEventFlg) {
      dispatch(setScrollEventFlg(false));
      dispatch(festivalIndex());
    }
  }

  // 상세페이지로 이동
  function redirectShow(item) {
    dispatch(setFestivalInfo(item)); //redux에 상세정보 저장
    navigate(`/festivals/${item.contentid}`); //jsx div.card의 onClick에 들어갈 함수 설정
  }

  return (
    <>
      <div className="container">
        {/* {festivalList && */}
        {festivalList.length > 0 &&
          festivalList.map((item) => {
            return (
              <div
                className="card"
                key={item.contentid}
                onClick={() => {
                  redirectShow(item);
                }}
              >
                <div
                  className="card-img"
                  style={{
                    backgroundImage: `url('${item.firstimage}')`,
                  }}
                ></div>
                <p className="card-title">{item.title}</p>
                <p className="card-period">
                  {dateFormatter.withHyphenYMD(item.eventstartdate)} ~{" "}
                  {dateFormatter.withHyphenYMD(item.eventenddate)}
                </p>
              </div>
            );
          })}
      </div>
      {/* <button type="button" onClick={addNextPage}>
        더보기
      </button> */}
    </>
  );
}

export default FestivalList;
