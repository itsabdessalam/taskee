import { useIntl } from "react-intl";
import { LoginForm, SEO } from "../components";

const Login = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "login" });

  return (
    <>
      <SEO title={title} />
      <LoginForm />
    </>
  );
};

export default Login;
