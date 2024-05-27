import React from "react";
import { LockOutlined, UserOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Button, Form, Input, Typography } from "antd";
import { FormBox, WrapperBox, WrapperInput, StyledButton } from "./login.style";
import { LoginFormValues } from "../../types";
import { instance } from "../../axois/axiosCreate";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const FormLogin: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleSubmit = async (values: LoginFormValues): Promise<void> => {
    try {
      const userData = {
        email: values.email,
        password: values.password,
      };
      const response = await instance.post("/auth/login", userData);

      if (response.data && response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        console.log("Успешный вход:", response.data);
        navigate("/home");
      } else {
        console.error("Ответ сервера не содержит токен.");
      }
    } catch (error) {
      console.error("Ошибка при входе:", error);
    }
  };
  return (
    <Form
      name="normal_login"
      initialValues={{ remember: true }}
      onFinish={handleSubmit}
    >
      <WrapperBox>
        <FormBox>
          <YoutubeOutlined
            twoToneColor="#eb2f96"
            style={{
              marginTop: "40px",
              display: "flex",
              justifyContent: "center",
              fontSize: "88px",
              color: "#b1817d",
            }}
          />

          <Title
            style={{
              fontSize: "28px",
            }}
            level={3}
          >
            Вход
          </Title>

          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <WrapperInput>
              <Input
                style={{ height: "48px" }}
                prefix={<UserOutlined />}
                placeholder="email"
              />
            </WrapperInput>
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <WrapperInput>
              <Input.Password
                style={{ height: "48px" }}
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </WrapperInput>
          </Form.Item>

          <Form.Item>
            <StyledButton type="primary" htmlType="submit" form="normal_login">
              Log in
            </StyledButton>
          </Form.Item>
        </FormBox>
      </WrapperBox>
    </Form>
  );
};

export default FormLogin;

//////////////////////////////////////////////////////////из туду

// import { useState, FC } from "react";
// import TextField from "@mui/material/TextField";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputLabel from "@mui/material/InputLabel";
// import InputAdornment from "@mui/material/InputAdornment";
// import FormControl from "@mui/material/FormControl";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import {
//   StyledBox,
//   StyledTypography,
//   StyledButton,
//   StyledTypographyForLink,
// } from "./login.style";
// import Box from "@mui/material/Box";
// import { Form as FinalForm, Field } from "react-final-form";
// import { useNavigate, Link } from "react-router-dom";
// import { instance } from "../../axios/axiosCreate";
// import { LoginFormValues } from "../../types";

// const Login: FC = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   const navigate = useNavigate();

//   const handleClickShowPassword = (): void =>
//     setShowPassword((preValue) => !preValue);

//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ): void => {
//     event.preventDefault();
//   };

//   const handleSubmit = async (values: LoginFormValues): Promise<void> => {
//     try {
//       const userData = {
//         email: values.email,
//         password: values.password,
//       };
//       const response = await instance.post("/auth/login", userData);

//       if (response.data && response.data.token) {
//         localStorage.setItem("authToken", response.data.token);

//         console.log("Успешный вход:", response.data);
//         navigate("/home");
//       } else {
//         console.error("Ответ сервера не содержит токен.");
//       }
//     } catch (error) {
//       console.error("Ошибка при входе:", error);
//     }
//   };

//   return (
//     <FinalForm
//       onSubmit={handleSubmit}
//       render={({
//         handleSubmit: formHandleSubmit,
//         form,
//         submitting,
//         pristine,
//         values,
//         invalid,
//       }) => (
//         <StyledBox>
//           <Box
//             sx={{
//               "& > :not(style)": { margin: "20px", width: "auto" },
//               display: "flex",
//               flexDirection: "column",
//               flexWrap: "wrap",
//               backgroundColor: "whitesmoke",
//               width: "325px",
//             }}
//             onSubmit={formHandleSubmit}
//             component="form"
//           >
//             <StyledTypography variant="h6">Login</StyledTypography>

//             <Field name="email">
//               {({ input: { value, onChange } }) => (
//                 <TextField
//                   id="outlined-basic"
//                   label="Login"
//                   variant="outlined"
//                   value={value}
//                   onChange={onChange}
//                 />
//               )}
//             </Field>

//             <Field name="password">
//               {({ input: { value, onChange } }) => (
//                 <FormControl sx={{ m: 1, width: "30ch" }} variant="outlined">
//                   <InputLabel htmlFor="outlined-adornment-password">
//                     Password
//                   </InputLabel>
//                   <OutlinedInput
//                     id="outlined-adornment-password"
//                     type={showPassword ? "text" : "password"}
//                     endAdornment={
//                       <InputAdornment position="end">
//                         <IconButton
//                           aria-label="toggle password visibility"
//                           onClick={handleClickShowPassword}
//                           onMouseDown={handleMouseDownPassword}
//                           edge="end"
//                         >
//                           {showPassword ? <VisibilityOff /> : <Visibility />}
//                         </IconButton>
//                       </InputAdornment>
//                     }
//                     label="Password"
//                     value={value}
//                     onChange={onChange}
//                   />
//                 </FormControl>
//               )}
//             </Field>

//             <Stack spacing={1} direction="row" justifyContent="space-around">
//               <StyledButton
//                 variant="contained"
//                 disabled={pristine || submitting || invalid}
//                 type="submit"
//               >
//                 Sign in
//               </StyledButton>
//             </Stack>
//             <StyledTypographyForLink>
//               Don't have an Account? <Link to="/registration">Sign Up!</Link>
//             </StyledTypographyForLink>
//           </Box>
//         </StyledBox>
//       )}
//     />
//   );
// };

// export default Login;
