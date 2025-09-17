import Header from "./components/common/Header.jsx";
import "./App.css";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useEffect } from "react";
import { localStorageUtil } from "./utils/localStorageUtil.js";
import { dateFormatter } from "./utils/dateFormatter.js";
function App() {
  useEffect(() => {
    // TODO
    // 로컬스토리지에 저장된 날짜를 획득
    const clearDate = localStorageUtil.getClearDate();
    const nowDate = dateFormatter.formatDateToYMD(new Date());
    if (clearDate !== nowDate) {
      // 저장된 날짜 있을 시 아래처리 속행
      // 오늘 날짜랑 비교
      localStorageUtil.clearLocalStorage();
      localStorageUtil.setClearDate(nowDate);

      // state가 초기화 되지않는 현상을 해결하기위해 강제로 화면 새로고침.
      window.location.reload();
    }
  }, []);
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
      {/* 스크롤 초기화 최상위 컴포넌트에 한번만 추가*/}
      <ScrollRestoration />
    </>
  );
}

export default App;
