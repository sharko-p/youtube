import styled from "styled-components";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const WrapperBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;

  height: 800px;
  padding: 140px 465px 140px 465px;
`;

const FormBox = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 510px;
  height: 520px;
  top: 140px;
  left: 465px;
  background: #ffffff;
`;
const WrapperInput = styled.div`
  width: 334px;

  margin-top: 15px;
`;

const StyledButton = styled(Button)({
  marginTop:'15px',
  width: "176px",
  height: "52px",
  borderRadius: "5px",
});


export { FormBox, WrapperBox, WrapperInput, StyledButton};

