import styled from 'styled-components';

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  border: ${({ theme }) => `1px solid ${theme.colors.purple}`};
  border-radius: 15px;
  background-color: transparent;
  cursor: pointer;
  transition: 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
    color: ${({ theme }) => theme.colors.white};
  }
`;

export default Button;
