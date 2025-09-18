import { useEffect, useState } from "react";
import "./BeforeInstallPrompt.css";
function BeforeInstallPrompt() {
  const [defferredPrompt, setDeferredPrompt] = useState(null);

  function handleBeforeInstallPrompt(e) {
    //현재 코드에서 e의 출처는? 브라우저가 제공하는 이벤트 객체
    e.preventDefault(); // 브라우저의 기본 설치 프롬프트 동작을 방지 (설치 팝업 방지)

    setDeferredPrompt(e); // 이벤트 객체를 state에 저장하여 나중에 사용할 수 있도록 함
  }

  async function handleInstall() {
    if (defferredPrompt) {
      // 저장된 이벤트 객체를 사용하여 설치 프롬프트를 표시
      defferredPrompt.prompt();
      // 사용자의 선택을 기다림 (accepte | dismiss)
      const result = await defferredPrompt.userChoice;
      if (result.outcome === "accepted") {
        console.log("사용자가 설치를 수락했습니다.");
      } else {
        console.log("사용자가 설치를 거부했습니다.");
      }
    }
    // 한번 사용한 prompt는 다시 사용할 수 없으므로 초기화
    setDeferredPrompt(null);
  }
  useEffect(() => {
    // 'beforeinstallprompt' 이벤트 리스너 등록
    // - 브라우저가 앱 설치가 가능할 때 발생
    // - 이 이벤트를 state에 캐치 (저장)하여 사용자에게 설치 프롬프트를 보여줄 수 있음
    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => {
      // clean-up function
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);
  return (
    <>
      {
        // 설치 가능한 상태일때만 버튼 출력
        defferredPrompt && (
          <div className="prompt-container">
            <p className="prompt-info">브라우저를 App에다 싸서 드셔보세요</p>
            <button
              type="button"
              onClick={handleInstall}
              className="prompt-btn"
            >
              다운로드
            </button>
          </div>
        )
      }
    </>
  );
}

export default BeforeInstallPrompt;
