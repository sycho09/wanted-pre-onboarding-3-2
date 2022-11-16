import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: React.ReactNode;
}

const LoginLayout: React.FC<Props> = ({ children }) => {
  return (
    <StyledMain>
      <SignInSelection>{children}</SignInSelection>
    </StyledMain>
  );
};
export default LoginLayout;

const StyledMain = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SignInSelection = styled.div`
  font-size: 0.9rem;
  margin-bottom: 1rem;
`;
