import { useIntl } from "react-intl";
import { RegisterForm, SEO } from "../components";

const Register = () => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "register" });

  return (
    <>
      <SEO title={title} />
      <RegisterForm />
    </>
  );
};

export default Register;
