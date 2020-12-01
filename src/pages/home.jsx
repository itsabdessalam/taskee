import { FormattedMessage } from "react-intl";
import { Title, LocaleSelector, ThemeSwitcher, SEO } from "../components";

const Home = () => {
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
    </>
  );
};

export default Home;
