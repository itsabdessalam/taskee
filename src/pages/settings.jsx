import { useIntl } from "react-intl";
import { SettingsForm, SEO, Icon } from "../components";

const Settings = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "settings" });

  return (
    <>
      <SEO title={title} />
      <SettingsForm />
    </>
  );
};

export default Settings;
