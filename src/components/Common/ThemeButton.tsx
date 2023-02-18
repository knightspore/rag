import { Dispatch, SetStateAction } from "react";
import { Theme } from "../../constants/themes";
import { TfiShine } from "react-icons/tfi";
import { CiDark } from "react-icons/ci";

type ThemeButtonProps = {
  currentTheme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  className: string;
}

const ThemeButton = ({currentTheme, setTheme, className}: ThemeButtonProps) => {
  switch(currentTheme) {
    case Theme.Light:
      return (
        <CiDark onClick={() => setTheme(Theme.Dark)} className={className}/>
      );
    case Theme.Dark:
      return (
        <TfiShine onClick={() => setTheme(Theme.Light)} className={className} />
      );
    default:
      return (
        <TfiShine onClick={() => setTheme(Theme.Light)} className={className} />
      );
  }
};

export default ThemeButton
