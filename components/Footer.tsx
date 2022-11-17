import React from 'react';
import styled from 'styled-components';

export default function Footer() {
  return <StyledFooter>powered by December and Company</StyledFooter>;
}

const StyledFooter = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid;
  border-color: ${({ theme }) => theme.colors.grey};
  color: darkgray;
  font-size: 0.8rem;
`;
