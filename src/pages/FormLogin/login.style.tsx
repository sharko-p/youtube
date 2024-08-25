import styled from "styled-components";
import { Button } from "antd";

const WrapperBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  padding: 140px 465px 140px 465px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
  background: #ffffff;
`;
const WrapperInput = styled.div`
  width: 334px;
  margin-top: 15px;
`;

const StyledButton = styled(Button)({
  marginTop: "15px",
  width: "180px",
  height: "50px",
  borderRadius: "5px",
});

export { FormBox, WrapperBox, WrapperInput, StyledButton };
