import styled from 'styled-components/macro';

const BarTitle = styled.p`
  font-size: 2.5rem;
  text-align: center;
  font-weight: ${({ theme }) => theme.fonts.bold};
  color: ${({ theme }) => theme.colors.purple};
`;

export default BarTitle;
