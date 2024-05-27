import styled from "styled-components";
import { Button, Checkbox, Form, Input, Typography } from "antd";

const WrapperHeader = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: cornsilk;
  height: 80px;
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  height: 80px;
  width: 80%;
  justify-content: space-between;
`;
const Ul = styled.ul`
  list-style-type: none;
  color: inherit;
  margin: 0px;
  display: flex;
`;
const Li = styled.li`
  margin-left: 40px;
`;

export { WrapperHeader, Header, Ul, Li };
