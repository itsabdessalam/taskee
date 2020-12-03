import styled from "styled-components";

const StyledOffline = styled.div`
  &.alert-offline {
    display: none;
    position: fixed;
    left: 50%;
    transform: translate(-50%, 0);
    background: #ef4444;
    color: white;
    padding: 15px;
    text-align: center;
    z-index: 100000;
    width: 100%;
  }
`;

const Offline = () => {
  return (
    <div>
      <StyledOffline className="alert-offline">
        Oops.. Seems like you are offline...
      </StyledOffline>
    </div>
  );
};

export default Offline;
