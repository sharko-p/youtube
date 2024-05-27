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


///////////////////////////////////////////////
// import React from 'react';
// import styled from 'styled-components';

// const StyledButton = styled.button`
//   background-color: #007bff;
//   color: white;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const StyledComponentsButton = () => {
//   return (
//     <StyledButton>
//       Click me (Styled Components)
//     </StyledButton>
//   );
// };

// export default StyledComponentsButton;
/////////////////////////////////////////////////////
//  .login-form {
//     max-width: 300px;
//   }
//  .login-form-forgot {
//     float: right;
//   }
//    .ant-col-rtl .login-form-forgot {
//     float: left;
//   }
//    .login-form-button {
//     width: 100%;
//   }

// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import { Typography, styled } from "@mui/material";

// const StyledBox = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   height: "100vh",
//   backgroundColor: "gainsboro",
// });

// const StyledTypography = styled(Typography)({
//   textAlign: "center",
//   fontWeight: "bold",
// });

// const StyledButton = styled(Button)({
//   bgColor: "#4CAF50",
//   color: "white",
//   padding: "10px 32px",
//   textAlign: "center",
//   textDecoration: "none",
//   display: "inline-block",
//   width: "140px",
//   fontSize: "16px",
//   margin: "4px 2px",
//   cursor: "pointer",

//   "&:hover": {
//     backgroundColor: "#3e8e41",
//   },
// });
// const StyledTypographyForLink = styled(Typography)({
//   textAlign: "center",
// });

// export { StyledBox, StyledTypography, StyledButton, StyledTypographyForLink };
