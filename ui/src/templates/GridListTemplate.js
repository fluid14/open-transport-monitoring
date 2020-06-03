import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { GridViewTypeConsumer } from 'context/GridViewTypeContext';
import translations from 'translations/pl/allVehicleTable.json';

const GridWrap = styled.div`
  display: grid;
  grid-template-columns: ${({ viewStyle }) =>
    viewStyle ? 'repeat(auto-fill, minmax(22.5rem, 1fr))' : '1fr'};
  grid-gap: 35px 42px;
  padding-top: 0.8vh;
  padding-bottom: 32vh;
  transition: 0.3s ease;
`;

const StyledTable = styled.table`
  border-radius: 32px;
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  border: none;
  border-collapse: separate;
  border-spacing: 0 1.5rem;
  user-select: none;
  text-align: center;
`;

const TableParagraph = styled.p`
  font-size: 1.4rem;
  font-weight: ${({ theme }) => theme.fonts.extraBold};
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.9rem;
`;

const StyledTH = styled.th`
  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.5rem 2.2rem;

  &:nth-child(1) {
    border-radius: 8px 0 0 8px;
  }

  &:nth-last-child(1) {
    border-radius: 0 8px 8px 0;
  }
`;

const TDSpacing = styled.td`
  padding: 0;
`;

const translationsArray = Object.entries(translations);

const GridListTemplate = ({ children }) => (
  <GridViewTypeConsumer>
    {gridView => (
      <>
        {!gridView.type && (
          <StyledTable>
            <thead>
              <tr>
                {translationsArray.map(([key, title]) => (
                  <StyledTH key={key}>
                    <TableParagraph>{title}</TableParagraph>
                  </StyledTH>
                ))}
              </tr>
            </thead>
            <tbody>
              <TDSpacing />
              {children}
            </tbody>
          </StyledTable>
        )}
        {gridView.type && <GridWrap viewStyle={gridView.type}>{children}</GridWrap>}
      </>
    )}
  </GridViewTypeConsumer>
);

GridListTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default GridListTemplate;
