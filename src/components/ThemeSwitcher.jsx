import { useContext } from "react";
import ThemeContext from "../context/Theme";

const ThemeSwitcher = () => {
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const switchTheme = () => {
    updateTheme(activeTheme === "light" ? "dark" : "light");
  };

  return (
    <>
      {/* TODO: use theme switcher button */}
      <button onClick={switchTheme}>Switch Theme</button>
    </>
  );
};

export default ThemeSwitcher;
