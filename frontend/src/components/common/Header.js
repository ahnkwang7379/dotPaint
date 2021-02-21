import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';

const HeaderBlock = styled.div`
  z-index: 99;
  margin: 0 auto; /* 중앙 정렬 */
  position: fixed;
  width: 100%;
  background: #f2e8dc;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
  height: 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .logo {
    font-size: 1.125rem;
    font-weight: 800;
    letter-spacing: 2px;
    margin-right: 32px;
  }
  .right {
    display: flex;
    align-items: center;
  }
`;

const Spacer = styled.div`
  height: 4rem;
`;

const UserInfo = styled.div`
  font-weight: 800;
  margin-right: 1rem;
`;

const Header = ({ user, onLogout }) => {
  return (
    <>
      <HeaderBlock>
        <Wrapper>
          <div>
            <Link to="/" className="logo">
              DOTART
            </Link>
            <Button>
              <Link to="/dot">go Editor</Link>
            </Button>
          </div>
          {user ? (
            <div className="right">
              <UserInfo>{user.username}</UserInfo>
              <Button onClick={onLogout}>로그아웃</Button>
            </div>
          ) : (
            <div className="right">
              <Button to="/login">로그인</Button>
            </div>
          )}
        </Wrapper>
      </HeaderBlock>
      <Spacer />
    </>
  );
};

export default Header;
