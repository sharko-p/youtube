import styled from "styled-components";

const WrapperSavedRequests = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BoxSavedRequests = styled.div`
  width: 80%;
  display: flex;

  flex-direction: column;
  margin-bottom: 70px;
`;
const RequestsButton = styled.div`
  height: 45px;
  width: 100%;
  border: none;
  position: relative;
  font-weight: bold;
  background-color: cornsilk;
  display: flex;

  align-items: center;
  padding: 0 10px;
  margin-bottom: 5px;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.02);

    background-color: cornsilk;
    .action-buttons {
      display: flex;
    }
  }
`;

const ActionButtons = styled.div`
  display: none;
  position: absolute;
  right: 10px;
  top: 50%;

  gap: 5px;

  button {
    padding: 0 10px;
    background-color: transparent;

    border: none;

    &:hover {
      background-color: antiquewhite;
    }
  }
`;

export {
  WrapperSavedRequests,
  RequestsButton,
  BoxSavedRequests,
  ActionButtons,
};
