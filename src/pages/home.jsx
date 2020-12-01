import NotificationService from "../services/NotificationService";
import { Title, SEO } from "../components";

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
    </>
  );
};

export default Home;
