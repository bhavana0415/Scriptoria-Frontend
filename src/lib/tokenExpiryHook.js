// hooks/useAuthTimer.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAsync } from "../store/Features/auth/authSlice";

const getExpiryTime = (token) => {
  const parts = token.split(".");
  const payload = JSON.parse(atob(parts[1]));
  const expiryTime = payload.exp * 1000; // Convert expiry to milliseconds
  return expiryTime;
};

const useAuthTimer = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) return;

    const expiryTime = getExpiryTime(token);
    const currentTime = Date.now();
    const timeRemaining = expiryTime - currentTime;

    if (timeRemaining <= 0) {
      dispatch(logoutAsync());
      return;
    }

    const logoutTimer = setTimeout(() => {
      dispatch(logoutAsync());
    }, timeRemaining);

    const resetTimer = () => {
      clearTimeout(logoutTimer);
      const timeRemainingReset = getExpiryTime(token) - Date.now();
      setTimeout(() => {
        dispatch(logoutAsync());
      }, timeRemainingReset);
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    return () => {
      clearTimeout(logoutTimer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, [dispatch, token]);
};

export default useAuthTimer;
