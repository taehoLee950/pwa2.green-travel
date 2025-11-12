**주제**
공공API와 PWA를 활용한 여행지 및 인근 숙박업 소개 사이트

**주요 부분**
React thunk를 이용하여 API를 비동기 처리

Router를 이용하여 상세 페이지 구현

PWA를 활용하여 앱 형태로 제공 (백엔드 미구현으로 인해 로컬스토리지 외 저장이 불가)





**여러 라이브러리를 한번에 설치**
   'npm i react-router-dom @reduxjs/toolkit react-redux redux-thunk axios'

- check in package.json if installation was sucessful.

** PWA 적용 **

1. install PWA

- npm i -D vite-plugin-pwa : Dev모드로 vite bundle로 pwa사용

2. Manifest 설정
   `vite.config.js`에 PWA Manifest 설정을 추가
   - 아이콘 이미지 아래의 사이즈 별로 필요하다
     - 180x180(IOS), 192x192(web | Andriod) 512x512 (web | Android)

3. 서비스 워커 작성
   - `src/sw.js`, `src/swRegister.js` 파일 생성

4. `main.jsx`에 서비스 워커 레지스터 추가

5. `index.html`에 meta데이터 설정(IOS 대응 및 Manifest 기본 설정)

6. 위 설정 완료 후 빌드
   npm run build

7. 빌드한 것으로 동작하는 내장 서버 실행
