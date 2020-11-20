import { FormattedMessage } from "react-intl";

import { Title } from "../components";

const Home = () => {
  return (
    <>
      <Title level={2}>Home</Title>
      <FormattedMessage id="greeting" values={{ name: "John Doe" }} /> {/* only for test purposes */}
    </>
  );
};

export default Home;
