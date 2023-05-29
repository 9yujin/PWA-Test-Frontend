import "react-toastify/dist/ReactToastify.css";

import { toast, ToastContainer } from "react-toastify";

function ToastAlert() {
  return (
    <ToastContainer
      position="top-center"
      closeOnClick
      limit={1}
      autoClose={2000}
      closeButton={false}
      pauseOnHover={false}
      hideProgressBar={true}
      pauseOnFocusLoss={false}
      theme="colored"
      toastStyle={{
        minHeight: 0,
        background: "#f3f3f3",
        color: "#232323",
        boxShadow: "none",
        margin: "0 auto",
        width: "335px",
        padding: "18px",
        borderRadius: "16px",
      }}
      bodyStyle={{
        padding: 0,
        margin: 0,
        fontFamily: "Pretendard",
        letterSpacing: "-0.01em",
        fontSize: "14px",
      }}
    />
  );
}

function openToast(message: string) {
  return toast(message);
}

export { openToast, ToastAlert };
