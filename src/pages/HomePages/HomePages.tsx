import {
  WrapperHeader,
  Header,
  Ul,
  Li,

  
} from "./homePage.style";
import { YoutubeOutlined } from "@ant-design/icons";
import { NavLink, useNavigate } from "react-router-dom";
import InputSearch from '../../components/inputSearch/InputSearch'

const menuItems = [
  { id: 1, title: "Поиск", path: "#" },
  { id: 2, title: "Избранное", path: "#" },
  { id: 3, title: "Выйти", path: "/" },
];

const HomePages = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  return (
    <>
      <WrapperHeader>
        <Header>
          <button
            style={{ backgroundColor: "rgba(28,28,28,0)", border: "none" }}
          >
            <YoutubeOutlined
              onClick={() => handleClick()}
              style={{
                backgroundColor: "transparent",
                fontSize: "48px",
                color: "#b1817d",
              }}
            />
          </button>
          <nav>
            <Ul>
              {menuItems.map((item) => (
                <Li key={item.id}>
                  <NavLink to={item.path} style={{ textDecoration: "none" }}>
                    {item.title}
                  </NavLink>
                </Li>
              ))}
            </Ul>
          </nav>
        </Header>
      </WrapperHeader>
      <InputSearch/>
    </>
  );
};

export default HomePages;
