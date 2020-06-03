import styled from 'styled-components';

const ChangeView = styled.div`
  position: absolute;
  top: 3rem;
  right: 3.7rem;
  z-index: 9;
  border: 1px solid ${({ theme }) => theme.colors.purple};
  cursor: pointer;
  color: ${({ theme }) => theme.colors.purple};
  text-transform: uppercase;
  background-color: #fff;
  padding: 0.5rem 0.7rem 0.3rem;
  font-size: 1rem;
  font-weight: 700;
  border-radius: 8px;
  user-select: none;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
    color: #fff;
    border-color: #fff;
  }
`;

export default ChangeView;
