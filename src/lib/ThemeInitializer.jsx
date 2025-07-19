import { useEffect } from "react";
import { useSelector } from "react-redux";

const ThemeInitializer = () => {
  const currentMode = useSelector((state) => state.currentState.currentMode);

  useEffect(() => {
    const root = document.documentElement;
    if (currentMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [currentMode]);

  return null;
};

export default ThemeInitializer;
