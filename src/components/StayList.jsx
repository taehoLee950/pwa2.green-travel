import { useEffect } from "react";
import "./StayList.css";
import { useDispatch, useSelector } from "react-redux";
import { stayIndex } from "../store/thunks/stayThunk.js";
import { useNavigate } from "react-router-dom";
import { setCurrentStay } from "../store/slices/staySlice.js";

function FestivalStayList() {
  const dispatch = useDispatch();
  const stayList = useSelector((state) => state.stay.list);
  const navigate = useNavigate(); //navigate 불러오기

  useEffect(() => {
    if (stayList.length === 0) dispatch(stayIndex());
  }, []);

  function redirectStayShow(item) {
    dispatch(setCurrentStay(item)); //redux에 상세정보 저장
    navigate(`/stays/${item.contentid}`); //jsx div.card의 onClick에 들어갈 함수 설정
  }
  return (
    <>
      {stayList.length > 0 &&
        stayList.map((item) => (
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
                <p>{item.tel}</p>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default FestivalStayList;
