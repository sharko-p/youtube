import styled from "styled-components";
import { Input } from "antd";

interface H1Props {
  searchChange: boolean;
}

const WrapperSerchContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WrapperSerch = styled.div<H1Props>`
  width: 80%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 70px;
  align-items: ${(props) => (props.searchChange ? "none" : "center")};
`;

const H1 = styled.h1<H1Props>`
  margin-top: ${(props) => (props.searchChange ? "40px" : "220px")};
  font-size: ${(props) => (props.searchChange ? "28px" : "36px")};
`;

const WrapperInput = styled.div<H1Props>`
  margin-top: ${(props) => (props.searchChange ? "25px" : "70px")};
  width: ${(props) => (props.searchChange ? "100%" : "auto")};
`;

const InputStyle = styled(Input)<H1Props>`
  height: 50px;
  font-size: 20px;
  width: ${(props) => (props.searchChange ? "inherit" : "536px;")};
`;
const FilterPanelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const FilterPaneButtons = styled.button`
  border: none;
  background-color: transparent;
  font-size: 24px;
`;

const WrapperVideo = styled.div`
  list-style: none;
  margin: 0;
  padding: 0;

  &.listFilter {
    display: flex;
    flex-direction: column;
  }

  &.gridFilter {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }
`;

const ItemVideo = styled.div`
  border-radius: 10px;
  margin-bottom: 10px;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;

  &.listFilter {
    display: flex;
    align-items: center;
    color: green;
  }
  &.gridFilter {
    width: calc(25% - 210px);
    padding: 100px;
    text-align: center;
  }

  & iframe {
    border-radius: 10px;
  }
`;

export {
  WrapperSerchContainer,
  WrapperSerch,
  H1,
  InputStyle,
  WrapperInput,
  FilterPanelWrapper,
  FilterPaneButtons,
  WrapperVideo,
  ItemVideo,
};
