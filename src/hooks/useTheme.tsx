import { useEffect, useState } from "react";

import Button from "../components/Common/ThemeButton";

const useTheme = () => {
  const [theme, setTheme] = useState<string>(
    typeof window !== "undefined" ? localStorage.theme : "dark"
  );
  const colorTheme: string = theme === "dark" ? "light" : "dark";

  const ThemeButton = () => {
    return <Button currentTheme={theme} setTheme={setTheme} />;
  }

  useEffect(() => {
    const root: HTMLElement = window.document.documentElement;

    root.classList.remove(colorTheme);
    root.classList.add(theme);

    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  return ThemeButton;
}

export default useTheme;
