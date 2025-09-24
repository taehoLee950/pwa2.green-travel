import { useEffect, useLayoutEffect } from "react";
import "./StayList.css";
import { useDispatch, useSelector } from "react-redux";
import { stayIndex } from "../store/thunks/stayThunk.js";
import { useNavigate } from "react-router-dom";
import { setCurrentStay, resetStayList } from "../store/slices/staySlice.js";

function FestivalStayList() {
  // state + reducer + navigate 읽어오기
  const {
    list: stayList,
    pageNo,
    totalCount,
    isLoading,
  } = useSelector((state) => state.stay);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 클릭한 축제의 지역코드 state를 festivalSlice에 구조분해로 생성 (실제론 slice 파일에 없음)
  const { selectedAreaCode } = useSelector((state) => state.festival);

  // 가져온 서버의 데이터 수를 기반으로 페이지 나누기
  // 이 때 numOfRows는 axiosConfig의 값과 동일해야 함. (출력 갯수 지정값 = 미리 지정한 불러오기로 한 갯수값)
  const numOfRows = 12;
  const totalPages = Math.ceil(totalCount / numOfRows);

  // 1. FestivalShow에서 지역(areacode)을 선택했을 때, 해당 지역의 1페이지 데이터 불러오기
  useEffect(() => {
    if (selectedAreaCode) {
      dispatch(stayIndex({ areaCode: selectedAreaCode, page: 1 }));
    }
    // 컴포넌트가 사라질 때 목록을 리셋
    return () => {
      dispatch(resetStayList());
    };
  }, [selectedAreaCode, dispatch]);

  // stayList가 변경될 때마다 스크롤을 맨 위로 이동
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [stayList]);

  // 상세 페이지 이동
  function redirectStayShow(item) {
    dispatch(setCurrentStay(item));
    navigate(`/stays/${item.contentid}`);
  }

  // 이전/다음 페이지 핸들러
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch(stayIndex({ areaCode: selectedAreaCode, page: newPage }));
    }
  };

  // 로딩 중일 때 보여줄 UI
  if (isLoading && stayList.length === 0) {
    return <div className="loading-message">로딩 중...</div>;
  }

  return (
    <>
      {stayList.length > 0 ? (
        stayList.map((item) => {
          const contact =
            !item.tel || item.tel.trim() === ""
              ? "등록된 번호가 없습니다."
              : item.tel;
          return (
            <div
              className="stayContainer"
              key={item.contentid}
              onClick={() => redirectStayShow(item)}
            >
              <div
                className="stayCard"
                style={{
                  backgroundImage: `url('${item.firstimage}')`,
                }}
              ></div>
              <div className="stayInfo">
                <p className="stayTitle">{item.title}</p>
                <p className="stayAddress">{item.addr1}</p>
                <div className="stayContact">
                  <p>contact</p>
                  <p>{contact}</p>
                </div>
              </div>
            </div>
          );
        })
      ) : selectedAreaCode ? (
        <div className="no-results-message">
          <p>선택하신 지역에 해당하는 숙소가 없습니다.</p>
        </div>
      ) : (
        <div className="no-results-message">
          <p>축제 상세 정보에서 숙소를 검색해 보세요.</p>
        </div>
      )}

      {totalCount > 0 && (
        <div className="pagination-controls">
          <button
            onClick={() => handlePageChange(pageNo - 1)}
            disabled={pageNo <= 1}
          >
            이전
          </button>
          <span>
            Page {pageNo} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pageNo + 1)}
            disabled={pageNo >= totalPages}
          >
            다음
          </button>
        </div>
      )}
    </>
  );
}

export default FestivalStayList;
