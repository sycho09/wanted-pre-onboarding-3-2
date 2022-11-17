import React from 'react';
import styled from 'styled-components';

type BreadscrumbProps = {
  breadcrumb?: string;
};

export default function Header({ breadcrumb }: BreadscrumbProps) {
  return (
    <StyledHeader>
      <p>{breadcrumb}</p>
      <h2>PREFACE</h2>
    </StyledHeader>
  );
}

const StyledHeader = styled.div`
  width: 100%;
  height: 70px;
  display: flex;
  padding: 0 1rem;
  justify-content: space-between;
  align-items: center;
  background-color: lightgrey;

  h2 {
    font-size: 1.2rem;
    font-weight: bold;
    letter-spacing: 0.3rem;
  }
`;
