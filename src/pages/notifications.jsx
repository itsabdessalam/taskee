import NotificationService from "../services/NotificationService";
import { Title, SEO } from "../components";
import { useIntl } from "react-intl";

const Notifications = ({ children, ...props }) => {
  const intl = useIntl();
  const title = intl.formatMessage({ id: "notifications" });

  return (
    <>
      <SEO title={title} />
      <Title level={2} title={title}>
        Coming soon!
      </Title>
    </>
  );
};

export default Notifications;
