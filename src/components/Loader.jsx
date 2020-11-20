import styled from "styled-components";

const StyledLoader = styled.div`
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .loader {
    border: 2px solid rgb(139 156 172 / 40%);
    border-top: 2px solid ${({ theme }) => theme.colors.primary.base};
    border-radius: 50%;
    width: 28px;
    height: 28px;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Loader = ({ size }) => {
  return (
    <StyledLoader>
      <div className="loader" width={size} height={size}>
        {/* <div></div>
        <div></div>
        <div></div> */}
      </div>
    </StyledLoader>
  );
};

export default Loader;
