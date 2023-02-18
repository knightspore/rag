import { useEffect, useState } from "react";

import Button from "../components/Common/ThemeButton";
import { Theme } from "../constants/themes";

const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(
    typeof window !== "undefined" ? localStorage.theme : Theme.Dark
  );
  const colorTheme: Theme = theme === Theme.Dark ? Theme.Light : Theme.Dark;

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
