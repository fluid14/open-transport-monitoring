import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  font-size: 1.6rem;
  border: ${({ theme }) => `1px solid ${theme.colors.purple}`};
  border-radius: 0.8rem;
  color: ${({ theme }) => theme.colors.purple};
  background-color: transparent;
  cursor: pointer;
  overflow: hidden;
  transition: 0.3s ease;
  opacity: 0.8;

  &::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    left: 0;
    width: 0;
    height: 3px;
    background-color: ${({ theme }) => theme.colors.purple};
    transition: 0.4s ease;
  }
  &:hover::after {
    width: 100%;
  }
  &:hover {
    opacity: 1;
  }
`;

export default Button;
