import "./StayListShow.css";
import { useSelector } from "react-redux";

function StayListShow() {
  const stayInfo = useSelector((state) => state.stay.currentStay);

  // 로딩 처리
  if (!stayInfo) {
    return <div>숙박 정보를 불러오는 중입니다...</div>;
  }
  return (
    <>
      <div className="stayListShowContainer">
        <div
          className="stayListShowCard"
          style={{ backgroundImage: `url('${stayInfo.firstimage}')` }}
        ></div>
        <div className="stayListShowInfo">
          <p className="stayListShowTitle">{stayInfo.title}</p>
          <p className="stayListShowAddress">{stayInfo.addr1}</p>
          <p className="stayListShowContact">{stayInfo.tel}</p>
        </div>
      </div>
    </>
  );
}

export default StayListShow;
