import React from 'react';
import styled from 'styled-components';
// import Footer from './Footer';
// import Header from './Header';
// import Sidebar from './Sidebar';

type Props = {
  breadcrumb?: string;
  children?: React.ReactNode;
};

export default function MainLayout({
  breadcrumb,
  children,
}: Props): JSX.Element {
  return (
    <Wrapper>
      {/* <Sidebar /> */}
      <Main>
        {/* <Header breadcrumb={breadcrumb} /> */}
        <StyledContent>{children}</StyledContent>
        {/* <Footer /> */}
      </Main>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 200px);
  justify-content: space-between;
`;

const StyledContent = styled.div`
  padding: 1rem;
`;
