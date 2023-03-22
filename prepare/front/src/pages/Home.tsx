import React, { useCallback, useEffect, useState } from "react";
import Card from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import { Coupon } from "../types/couponType";
import { backUrl } from "../config";

const Home = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      title: "",
      couponNumber: "",
      lastDay: "",
      image: [],
    },
  ]);
  useEffect(() => {
    /**Coupon 정보 가져오기 */
    const getCoupon = async () => {
      try {
        const res = await axios.get(`${backUrl}api/cuopon`);

        setCoupons(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getCoupon();
  }, []);
  return (
    <Container>
      {coupons.map((coupon) => {
        return (
          <Card
            key={coupon.image?.[0]}
            couponNumber={coupon.couponNumber}
            title={coupon.title}
            lastDay={coupon.lastDay}
            image={coupon.image}
          />
        );
      })}
    </Container>
  );
};

export default Home;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #f6f1f1;
  display: flex;
  flex-wrap: wrap;
`;
