import { FormattedMessage } from "react-intl";
import NotificationService from "../services/NotificationService";

import { Title } from "../components";

const Home = () => {
  const handleClick = () => {
    NotificationService.send(
      "Taskee",
      "Hello world",
      "https://taskee.playgrnd.dev"
    );
  };

  return (
    <>
      <Title level={2}>Home</Title>
      <FormattedMessage
        id="greeting"
        values={{
          name: "John Doe"
        }}
      />
      {/* only for test purposes */}
      <button onClick={handleClick}>Push notification test</button>
    </>
  );
};

export default Home;
