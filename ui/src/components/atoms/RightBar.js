import styled from 'styled-components/macro';

const RightBar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  transform: ${({ isVisible }) => (isVisible === true ? 'translateX(0)' : 'translateX(200%)')};
  width: 35rem;
  height: 100vh;
  background-color: #fff;
  z-index: 999;
  transition: 0.5s ease;
  padding: 8rem 2rem 2rem;
  box-shadow: 0px 2px 33px 0px rgba(0, 0, 0, 0.75);
`;

export default RightBar;
