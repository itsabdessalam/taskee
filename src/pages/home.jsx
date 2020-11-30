import { FormattedMessage } from "react-intl";
import NotificationService from "../services/NotificationService";
import { Title, LocaleSelector, ThemeSwitcher, SEO } from "../components";

const Home = ({ children, ...props }) => {
  const testNotification = () => {
    NotificationService.send(
      "test",
      "test message",
      "https://taskee.playgrnd.dev"
    );
  };

  return (
    <>
      <SEO title={"Home"} />
      <Title level={2} title={"Home"}>
        Home
      </Title>
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
