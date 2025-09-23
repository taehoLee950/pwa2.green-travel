import "./StayListShow.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function StayListShow() {
  const stayInfo = useSelector((state) => state.stay.currentStay);

  // 로딩 처리
  if (!stayInfo) {
    return <div>숙박 정보를 불러오는 중입니다...</div>;
  }

  // contact 없을 시 문구 출력 용 변수
  // API 'tel' 값이 없을 시 빈 문자열말고 공백으로 해놓은 것 같은데??
  // 장난하냐
  const contact =
    !stayInfo.tel || stayInfo.tel.trim() === ""
      ? "등록된 번호가 없습니다."
      : stayInfo.tel;

  // backBtn 클릭 시 이전 페이지로 이동
  const navigate = useNavigate();
  function redirectBack() {
    navigate(-1);
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
          <p className="stayListShowContact">{contact}</p>
          <button
            type="button"
            onClick={redirectBack}
            className="stayListShowBackBtn"
          >
            되돌아가기
          </button>
        </div>
      </div>
    </>
  );
}

export default StayListShow;
