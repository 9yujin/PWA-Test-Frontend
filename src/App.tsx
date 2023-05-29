import axios from "axios";
import "./App.css";
import {
  getFcmToken,
  askNotificationPermission,
} from "./firebase-messaging-sw";
import { useEffect, useState } from "react";
import { ToastAlert } from "./ToastAlert";

function App() {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchToken();
    fetchNotificationPermission();
  }, []);

  const fetchToken = async () => {
    const res = await getFcmToken();
    setToken(res);
    //alert(res);
  };
  const fetchNotificationPermission = async () => {
    const res = await askNotificationPermission();
    setPermission(res);
    //alert(`브라우저 알림 권한 설정: ${res}`);
  };

  const registerToken = async (token: string) => {
    console.log(token);
    try {
      const response = await axios.post(
        `https://pwa.dudoong.com/v1/users/register/${token}`
      );
      console.log(response.data);
      alert(`userId ${response.data.id}번입니다`);
    } catch (e) {
      console.log(e);
    }
  };
  const updateToken = async (id: string, token: string) => {
    try {
      const response = await axios.post(
        `https://pwa.dudoong.com/v1/users/${id}/token/${token}`
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="info">홍익대학교 컴퓨터공학과 졸업프로젝트</p>
        <p className="info">token : {token}</p>
        <p className="info">permission : {permission}</p>

        <br />
        <button onClick={() => registerToken(token)} disabled={!token.length}>
          회원가입
        </button>
        <div className="update">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            style={{ width: "30px" }}
          />
          <button
            onClick={() => updateToken(id, token)}
            disabled={!token.length}
            style={{ width: "150px" }}
          >
            업데이트
          </button>
        </div>

        <button onClick={() => navigator.clipboard.writeText(token)}>
          토큰 복사
        </button>
        <div>
          <br />
          <p>** ios 사파리 (iOS 16.4 이상) **</p>
          <p>step 1. 홈화면에 추가 후 열기</p>
          <button
            onClick={fetchNotificationPermission}
            style={{ display: "block" }}
          >
            step 2. 알림 권한 허용
          </button>
          <button
            onClick={fetchToken}
            style={{ display: "block", marginTop: "12px" }}
          >
            step 3. 토큰 가져오기
          </button>
        </div>
      </header>
      <ToastAlert />
    </div>
  );
}

export default App;
