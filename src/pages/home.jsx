import { FormattedMessage } from "react-intl";
import NoteService from "../services/NoteService";

import { Title } from "../components";

const Home = () => {

  const testNotification = () => {
    NotificationService.send('test', 'test message', 'https://taskee.playgrnd.dev');
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
      <button onClick={testNotification}></button>
    </>
  );

};

export default Home;
