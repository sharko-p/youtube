import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  saveQuery,
  setOpenModalWindow,
  setCurrentQueryId,
  deleteQuery,
} from "../../redux/slice/savedQueriesSlice";
import {
  WrapperSavedRequests,
  RequestsButton,
  BoxSavedRequests,
  ActionButtons,
} from "./SavedRequest.style";
import ModalWindow from "../../components/ModalWindow/ModalWindow";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Task } from "../../redux/slice/savedQueriesSlice.types";

const SavedRequests: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { savedQueries, openModalWindow } = useSelector(
    (state: RootState) => state.savedQueries
  );

  useEffect(() => {
    const savedQueriesFromStorage: Task[] = JSON.parse(
      localStorage.getItem("savedQueries") || "[]"
    ).map((request: Omit<Task, "id">) => ({
      ...request,
      id: uuidv4(),
    }));

    if (savedQueriesFromStorage.length > 0) {
      dispatch(saveQuery(savedQueriesFromStorage));
    }
  }, []);

  const handleDelete = (id: string) => {
    dispatch(deleteQuery(id));
  };

  const handleEdit = (id: string) => {
    dispatch(setCurrentQueryId(id));
    dispatch(setOpenModalWindow(true));
  };

  const handleClickSearch = (query: string) => {
    navigate(`/YoutubeSPA?search=${query}`);
  };

  return (
    <>
      <WrapperSavedRequests>
        <BoxSavedRequests>
          <h2>Избранное</h2>
          {savedQueries.map((request) => (
            <div key={request.id}>
              <RequestsButton>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickSearch(request.query)}
                >
                  {request.title}
                </p>

                <ActionButtons className="action-buttons">
                  <button
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleEdit(request.id)}
                  >
                    Изменить
                  </button>
                  <button
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(request.id)}
                  >
                    Удалить
                  </button>
                </ActionButtons>
              </RequestsButton>
            </div>
          ))}
        </BoxSavedRequests>
      </WrapperSavedRequests>

      {openModalWindow && <ModalWindow />}
    </>
  );
};

export default SavedRequests;
