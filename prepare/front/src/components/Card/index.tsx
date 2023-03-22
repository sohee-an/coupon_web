import React, { useCallback, useEffect, useState, FC } from "react";
import styled from "styled-components";
import { imgURL } from "../../config/config";

import { Coupon } from "../../types/couponType";

const Card: FC<Coupon> = ({ title, couponNumber, image, lastDay }) => {
  // const kakaoButton = () => {
  //   if (window.Kakao) {
  //     const kakao = window.Kakao;

  //     if (!kakao.isInitialized()) {
  //       kakao.init(process.env.KAKAO_JS_KEY as string);
  //     }

  //     kakao.Share.sendDefault({
  //       objectType: "feed",
  //       content: {
  //         title: title,
  //         description: "#쿠폰  #카페 #분위기 #마트 ",
  //         imageUrl: image?.[0],
  //         link: {
  //           mobileWebUrl: "https://developers.kakao.com",
  //           webUrl: "https://developers.kakao.com",
  //         },
  //       },

  //       buttons: [
  //         {
  //           title: "웹으로 보기",
  //           link: {
  //             mobileWebUrl: "https://developers.kakao.com",
  //             webUrl: "https://developers.kakao.com",
  //           },
  //         },
  //         {
  //           title: "앱으로 보기",
  //           link: {
  //             mobileWebUrl: "https://developers.kakao.com",
  //             webUrl: "https://developers.kakao.com",
  //           },
  //         },
  //       ],
  //     });
  //   }
  // };

  return (
    <Container>
      <TopWrapper>
        <Title>{title}</Title>
        <Image src={`/${image?.[0]}`}></Image>
        <div>쿠폰번호:{couponNumber}</div>
        <div>{lastDay}</div>
      </TopWrapper>

      <BottomWrapper>
        <button>
          <CacaoImg
            src="https://developers.kakao.com/assets/img/about/logos/kakaotalksharing/kakaotalk_sharing_btn_medium.png"
            alt="카카오톡 공유 보내기 버튼"
          />
        </button>
      </BottomWrapper>
    </Container>
  );
};

export default Card;

const Container = styled.div`
  max-width: 230px;
  min-width: 230px;
  height: 350px;
  border-radius: 5%;
  border: 1.3px solid black;
  margin: 10px;
  overflow: hidden;
  flex: 1;
`;
const TopWrapper = styled.div`
  width: 100%;
  height: 70%;
  text-align: center;
`;
const BottomWrapper = styled.div`
  height: 30%;
  border-top: 1px solid black;
`;
const Title = styled.h1``;
const Image = styled.img`
  width: 150px;
  height: 120px;

  border: 1px solid black;
`;
const CacaoImg = styled.img`
  width: 50px;
  height: 50px;
`;
