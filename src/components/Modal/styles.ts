import { makeStyles } from "@mui/styles";
import styled from "@emotion/styled";

export default makeStyles({
  modalStyles: {
    width: "fit-content",
    borderRadius: "4px",
  },
});

export const ImageFood = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 8px;
`;

export const WrapAction = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export const ImgWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 300px;
  background: rgba(208, 210, 235, 0.29);
  position: relative;
  button {
    min-width: 0;
  }
`;

export const StyledImg = styled.img`
  display: block;
  max-width: 400px;
  height: 100%;
`;

export const GarbageCanWrap = styled.div`
  position: absolute;
  top: 23px;
  right: 23px;
`;

export const ContentUpload = styled.div`
  background-color: #edf2f7;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 400px;
  height: 300px;
  border-radius: 6px;
  cursor: pointer;
  color: #425466;
  font-size: 14px;
  text-align: center;
  font-family: Proxima Nova;
  font-weight: 700;
`;

export const TextUpload = styled.p`
  width: 240px;
  font-size: 15px;
`;
