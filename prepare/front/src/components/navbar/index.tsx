import React from "react";
import styled from "styled-components";

const Navbar = () => {
  return (
    <Container>
      <Logo>쿠폰 킵</Logo>
      <Item>
        <Button>로그인</Button>
        <Button>회원가입</Button>
      </Item>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 40px;
  background-color: #19a7ce;
  align-items: center;
  position: fixed;
`;
const Logo = styled.div`
  width: 85%;
`;
const Item = styled.div`
  width: 15%;
  display: felx;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;
const Button = styled.button`
  display: flex;
  border: none;
  border-radius: 5%;
  background-color: #f6f1f1;
`;
