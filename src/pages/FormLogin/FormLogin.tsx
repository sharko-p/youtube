import React from "react";
import { LockOutlined, UserOutlined, YoutubeOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import { FormBox, WrapperBox, WrapperInput, StyledButton } from "./login.style";
import { LoginFormValues } from "./form.login.types";
import { instance } from "../../axois/axiosCreate";
import { useNavigate } from "react-router-dom";
import { pathsPrivate } from "../../routes/paths-component/paths";

const { Title } = Typography;

const FormLogin: React.FC = () => {
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    console.log("Received values of form: ", values);
  };

  const handleSubmit = async ({
    email,
    password,
  }: LoginFormValues): Promise<void> => {
    try {
      const userData = {
        email: email,
        password: password,
      };
      const response = await instance.post("/auth/login", userData);

      if (response.data && response.data.token) {
        localStorage.setItem("authToken", response.data.token);

        console.log("Успешный вход:", response.data);
        navigate(pathsPrivate.SearchVideo);
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
              Войти
            </StyledButton>
          </Form.Item>
        </FormBox>
      </WrapperBox>
    </Form>
  );
};

export default FormLogin;
