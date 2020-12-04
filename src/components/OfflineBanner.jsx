import { useIntl } from "react-intl";
import styled from "styled-components";

const StyledOfflineBanner = styled.div`
  &.offline__banner {
    display: none;
    position: fixed;
    left: 0;
    right: 0;
    background: #ef4444;
    color: #ffffff;
    padding: 15px;
    text-align: center;
    z-index: 1;
    width: 100%;
  }
`;

const OfflineBanner = () => {
  const intl = useIntl();

  return (
    <StyledOfflineBanner className="offline__banner">
      {intl.formatMessage({ id: "offlineBanner" })}
    </StyledOfflineBanner>
  );
};

export default OfflineBanner;
