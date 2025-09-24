import { useDispatch, useSelector } from "react-redux";
import "./FestivalList.css";
import { useEffect } from "react";
import { festivalIndex } from "../../store/thunks/festivalThunk.js";
import { dateFormatter } from "../../utils/dateFormatter.js";
import { setScrollEventFlg } from "../../store/slices/festivalSlice.js";
import { useNavigate } from "react-router-dom";

//read
function FestivalList() {
  const festivalList = useSelector((state) => state.festival.list);
  console.log(`API 리턴값:${festivalList}`);
  const scrollEventFlg = useSelector((state) => state.festival.scrollEventFlg);
  const dispatch = useDispatch();
  const navigate = useNavigate(); //navigate 불러오기

  useEffect(() => {
    window.addEventListener("scroll", addNextPage);

    if (festivalList.length === 0) {
      dispatch(festivalIndex());
    }

    return () => {
      // clean-up function
      window.removeEventListener("scroll", addNextPage);
    };
  }, []);

  // API 추가 요청
  function addNextPage() {
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
  // jsx영역 onClick()에 들어갈 예정인 함수.
  function redirectShow(item) {
    navigate(`/festivals/${item.contentid}`);
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
