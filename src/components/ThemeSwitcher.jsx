import { useContext } from "react";
import { useIntl } from "react-intl";
import ThemeContext from "../context/Theme";
import Button from "./Button";

const ThemeSwitcher = () => {
  const { activeTheme, updateTheme } = useContext(ThemeContext);
  const intl = useIntl();

  const switchTheme = () => {
    updateTheme(activeTheme === "light" ? "dark" : "light");
  };

  return (
    <>
      <Button
        onClick={switchTheme}
        title={intl.formatMessage({ id: "switchTheme" })}
      >
        Switch Theme
      </Button>
    </>
  );
};

export default ThemeSwitcher;
