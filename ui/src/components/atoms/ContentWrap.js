import styled from 'styled-components';

const ContentWrap = styled.div`
  position: relative;
  width: 100%;
  overflow-y: scroll;
  padding: 0 3.7rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default ContentWrap;
