import axios from "axios";
import "./App.css";
import {
  requestPermission,
  askNotificationPermission,
} from "./firebase-messaging-sw";
import { useEffect, useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    fetchToken();
  }, []);

  const fetchToken = async () => {
    const { token } = await requestPermission();
    setToken(token);
    setPermission(permission);
    alert(token);
  };

  const registerToken = async (token: string) => {
    console.log(token);
    try {
      const response = await axios.post(
        `https://pwa.dudoong.com/v1/users/register/${token}`
      );
      console.log(response.data);
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
        <p>
          홍익대학교 컴퓨터공학과 졸업프로젝트
          <br />
          token : {token}
          <br />
          permission : {permission}
        </p>
        <button onClick={() => registerToken(token)} disabled={!token.length}>
          회원가입
        </button>
        <div className="update">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <button
            onClick={() => updateToken(id, token)}
            disabled={!token.length}
          >
            업데이트
          </button>
        </div>
        <button onClick={() => navigator.clipboard.writeText(token)}>
          토큰 복사
        </button>
        <button
          onClick={() => {
            askNotificationPermission();
            fetchToken();
          }}
        >
          알림 요청
        </button>
      </header>
    </div>
  );
}

export default App;
