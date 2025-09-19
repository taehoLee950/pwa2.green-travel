import "./FestivalStayList.css";

function FestivalStayList() {
  return (
    <>
      <div className="stayContainer">
        <div
          className="stayCard"
          style={{ backgroundImage: `url('/base/header-img.png')` }}
        ></div>
        <div className="stayInfo">
          <p className="stayTitle">title</p>
          <p className="stayAddress">address</p>
          <div className="stayContact">
            <p>contact</p>
            <p>000-0000-0000</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default FestivalStayList;
