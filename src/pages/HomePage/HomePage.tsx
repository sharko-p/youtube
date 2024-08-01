import { WrapperHeader, Header, Ul, Li } from "./homePage.style";
import { YoutubeOutlined } from "@ant-design/icons";
import { NavLink, useNavigate, Outlet } from "react-router-dom";

const menuItems = [
  { id: 1, title: "Поиск", path: "/YoutubeSPA/SearchVideo" },
  { id: 2, title: "Избранное", path: "/YoutubeSPA/SavedRequests" },
  { id: 3, title: "Выйти", path: "/" },
];

const HomePage = () => {
  const navigate = useNavigate();

  const handleClickHome = () => {
    navigate("/YoutubeSPA");
  };
  return (
    <>
      <WrapperHeader>
        <Header>
          <YoutubeOutlined
            onClick={() => handleClickHome()}
            style={{
              backgroundColor: "transparent",
              fontSize: "48px",
              color: "#b1817d",
            }}
          />

          <nav>
            <Ul>
              {menuItems.map((item) => (
                <Li key={item.id}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) => (isActive ? "active" : "")}
                    style={{ textDecoration: "none" }}
                  >
                    {item.title}
                  </NavLink>
                </Li>
              ))}
            </Ul>
          </nav>
        </Header>
      </WrapperHeader>

      <Outlet />
    </>
  );
};

export default HomePage;
