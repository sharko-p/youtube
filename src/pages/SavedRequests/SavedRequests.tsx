import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  saveQuery,
  setOpenModalWindow,
  setCurrentQueryIndex,
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

const SavedRequests: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { savedQueries, openModalWindow } = useSelector(
    (state: RootState) => state.savedQueries
  );

  useEffect(() => {
    const savedQueriesFromStorage = JSON.parse(
      localStorage.getItem("savedQueries") || "[]"
    );
    if (savedQueriesFromStorage.length > 0) {
      dispatch(saveQuery(savedQueriesFromStorage));
    }
  }, [dispatch]);

  const handleDelete = (index: number) => {
    dispatch(deleteQuery(index));
  };

  const handleEdit = (index: number) => {
    dispatch(setCurrentQueryIndex(index));
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
          {savedQueries.map((request, index) => (
            <div key={index}>
              <RequestsButton>
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => handleClickSearch(request.query.toString())}
                >
                  {request.title.toString()}
                </p>

                <ActionButtons className="action-buttons">
                  <button
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => handleEdit(index)}
                  >
                    Изменить
                  </button>
                  <button
                    style={{ color: "red", cursor: "pointer" }}
                    onClick={() => handleDelete(index)}
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
