import { useEffect } from "react";
import "./StayList.css";
import { useDispatch, useSelector } from "react-redux";
import { stayIndex } from "../store/thunks/stayThunk.js";

function FestivalStayList() {
  const dispatch = useDispatch();
  const stayList = useSelector((state) => state.stay.list);

  useEffect(() => {
    if (stayList.length === 0) dispatch(stayIndex());
  }, []);

  console.log(stayList);
  return (
    <>
      {stayList.length > 0 &&
        stayList.map((item) => (
          <div className="stayContainer" key={item.contentid}>
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
