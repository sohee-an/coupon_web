import React, { useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const onClick = useCallback(() => {
    navigate(`/newCoupon`);
  }, []);

  const onClickHome = useCallback(() => {
    navigate(`/`);
  }, []);
  return (
    <Container>
      <TopItem></TopItem>
      <BottomItem>
        <button onClick={onClick}>쿠폰등록</button>
        <button onClick={onClickHome}>쿠폰 보러가기 </button>
      </BottomItem>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: #19a7ce;
  width: 100%;
  height: 130px;
`;
const TopItem = styled.div`
  height: 80%;
`;
const BottomItem = styled.div`
  height: 20%;
  display: flex;
  width: 100%;
  text-align: center;
`;
