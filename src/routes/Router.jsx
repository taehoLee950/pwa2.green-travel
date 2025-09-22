import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "../App";
import Main from "../components/Main.jsx";
import FestivalList from "../components/festivals/FestivalList.jsx";
import FestivalShow from "../components/festivals/FestivalShow.jsx";
import StayList from "../components/StayList.jsx";
import StayListShow from "../components/StayListShow.jsx";

// nested router
const router = createBrowserRouter([
  {
    //parent obj
    element: <App />,
    //children obj
    children: [
      {
        path: "/",
        element: <Main />,
      },
      {
        path: "/festivals",
        element: <FestivalList />,
      },
      {
        //:id = segment parameter: 동적으로 받을 때 사용
        // path부분에 지정됌 * ? 뒤에 오는 parameter랑은 다름
        // id는 외부값을 받아 동적으로 입력 됌
        // 왜 고정값으로 안하냐? : 사진 누를때 누른 요소가 열려야하니까 걔의 id를 받아야하는거임.
        // 즉 unique key같은 개념임.
        // festivals/"여기 암거나 쳐도 FestivalShow component로 감"
        // 그래서 festivals/'another' 이런식으로 다른 컴포넌트를 연결하면 중복이 됌
        // 왜냐하면 another이 외부 입력 동적으로 받는 :id에 자동으로 들어감
        // 최종적으로 얘네는 FestivalShow에서 useParams()로 불려옴.
        path: "/festivals/:id",
        element: <FestivalShow />,
      },
      {
        path: "/stays",
        element: <StayList />,
      },
      {
        path: "/stays/:id",
        element: <StayListShow />,
      },
    ],
  },
]);

function Router() {
  return <RouterProvider router={router} />; //giving props 'router' from line 6
}

export default Router;
