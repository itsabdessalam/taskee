import NotificationService from "../services/NotificationService";
import { Title, SEO } from "../components";
import { useIntl } from "react-intl";

const Home = ({ children, ...props }) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "home" });

  const testNotification = () => {
    NotificationService.send(
      "test",
      "test message",
      "https://taskee.playgrnd.dev"
    );
  };

  return (
    <>
      <SEO title={title} />
      <Title level={2} title={title}>
        Home
      </Title>
    </>
  );
};

export default Home;
