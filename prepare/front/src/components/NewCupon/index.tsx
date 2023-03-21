import React, { useCallback, useState, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { imgURL } from "../../config/config";

interface Inputs {
  title: string;
  couponNumber: string;
  lastDay: string;
}

const NewCupon = () => {
  // const backURL = "http://localhost:8070/api";

  const [inputs, setInputs] = useState<Inputs>({
    title: "",
    couponNumber: "",
    lastDay: "",
  });

  const [title, setTitle] = useState("");
  const [couponNumber, setCouponNumber] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [imagePaths, setImagePaths] = useState([]);

  /**inputs value */
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      e.preventDefault();

      const { name, value } = e.target;

      switch (name) {
        case "title":
          setTitle(value);
          break;
        case "couponNumber":
          setCouponNumber(value);
          break;
        case "lastDay":
          setLastDay(value);
          break;
        default:
          break;
      }
    },
    [setTitle, setCouponNumber, setLastDay]
  );

  console.log("inputs", title, lastDay, couponNumber);

  /**이미지만 먼저 저장 */
  const onChangeImages = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const imageFormData = new FormData();
      [].forEach.call(e.target.files, (f) => {
        imageFormData.append("image", f);
      });
      console.log(imageFormData);

      const postInput = async () => {
        try {
          const res = await axios.post(`api/cuopon/images`, imageFormData);
          setImagePaths(res.data);
        } catch (err) {
          console.dir(err);
        }
      };
      postInput();
    },
    []
  );

  /**이미지 텍스트 쿠폰넘버 날짜 까지 다 post */
  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (imagePaths.length > 0) {
        // 이미지 업로드가 완료되지 않은 경우 실행하지 않음
        const formData = new FormData();
        imagePaths.forEach((p) => {
          formData.append("image", p);
        });

        formData.append("title", title);
        formData.append("lastDay", lastDay);
        formData.append("couponNumber", couponNumber);
        try {
          const res = await axios.post(`api/cuopon`, formData);
          console.log("response", res);
          setTitle("");
          setCouponNumber("");
          setLastDay("");
          setImagePaths([]);
        } catch (err) {
          console.error(err);
        }
      }
    },
    [imagePaths, title, lastDay, couponNumber]
  );

  const imageInput = useRef<HTMLInputElement>(null);
  const onClickImageUpload = useCallback(() => {
    if (imageInput.current) {
      imageInput.current.click();
    }
  }, [imageInput.current]);

  return (
    <Container>
      <h1>새로운 쿠폰 등록 </h1>
      <AddCupon
        action="/post"
        method="post"
        encType="multipart/form-data"
        onSubmit={onSubmit}
      >
        <AddCuponItem>
          <label>Image</label>
          <CuponItemInput
            type="file"
            accept="image/*"
            multiple
            hidden
            ref={imageInput}
            onChange={onChangeImages}
          />
          <Button onClick={onClickImageUpload}>이미지 업로드</Button>

          <div>
            {imagePaths.map((v, i) => (
              <div key={v} style={{ display: "inline-block" }}>
                <img
                  src={`upload/${imgURL}${v}`}
                  style={{ width: "200px" }}
                  alt={v}
                />
              </div>
            ))}
          </div>
          <label>title</label>
          <CuponItemInput
            name="title"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />

          <label>coupon_number</label>
          <CuponItemInput
            name="couponNumber"
            placeholder="01234567"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
          <label>last_day</label>
          <CuponItemInput
            name="lastDay"
            placeholder="2022-03-13"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e)
            }
          />
        </AddCuponItem>
        <button type="submit">완료</button>
      </AddCupon>
    </Container>
  );
};

export default NewCupon;

const Container = styled.div`
  width: 100%;
  height: 100vh;
`;

const AddCupon = styled.form`
  width: 500px;
  height: 500px;
  border: 1px solid black;
  margin: 10px;
  padding: 20px;
`;

const AddCuponItem = styled.div`
  width: 250px;
  display: flex;
  flex-direction: column;
`;
const CuponItemInput = styled.input``;
const Button = styled.button``;
