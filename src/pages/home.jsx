import { FormattedMessage } from "react-intl";
import NotificationService from "../services/NotificationService";
import { Title, LocaleSelector, ThemeSwitcher } from "../components";

const Home = () => {
  const testNotification = () => {
    NotificationService.send(
      "test",
      "test message",
      "https://taskee.playgrnd.dev"
    );
  };

  return (
    <>
      <Title level={2}>Home</Title>
      <ThemeSwitcher /> {/* only for test purposes */}
      <LocaleSelector /> {/* only for test purposes */}
      <FormattedMessage
        id="greeting"
        values={{
          name: "John Doe"
        }}
      />
      {/* only for test purposes */}
      <button onClick={testNotification}></button>
    </>
  );
};

export default Home;
