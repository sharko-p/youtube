import React, { useState } from "react";
import axios from "axios";
import { Button, Space } from "antd";
import {
  HeartOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import ModalWindow from "../ModalWindow/ModalWindow";

import {
  WrapperSerch,
  WrapperSerchContainer,
  InputStyle,
  WrapperInput,
  WrapperVideo,
  ItemVideo,
  H1,
  FilterPanelWrapper,
  FilterPaneButtons,
} from "./InputSearch.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../redux/store";
import {
  setOpenModalWindow,
  setQuery,
  setSavedQuery,
} from "../../redux/slice/savedQueriesSlice";

type Video = {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    channelTitle: string;
  };
  statistics?: {
    viewCount?: string;
  };
};

const API_KEY = "AIzaSyD74dyEu5vEaGZAJZeLLCbZfYMKCvyAooU";

const InputSearch: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const query = useSelector((state: RootState) => state.savedQueries.query);

  const [videos, setVideos] = useState<Video[]>([]);
  const [searchChange, setSearchChange] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");

  const showModal = () => {
    dispatch(setSavedQuery(query));
    dispatch(setOpenModalWindow(true));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/search",
        {
          params: {
            key: API_KEY,
            part: "snippet",
            q: query,
            type: "video",
            maxResults: 12,
            videoEmbeddable: true,
            videoSyndicated: true,
          },
        }
      );
      const videoItems: Video[] = response.data.items;
      setVideos(videoItems);
      setSearchChange(true);
      fetchVideoStatistics(videoItems);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoStatistics = async (videos: Video[]) => {
    const videoIds = videos.map((video) => video.id.videoId).join(",");
    try {
      const response = await axios.get(
        "https://www.googleapis.com/youtube/v3/videos",
        {
          params: {
            key: API_KEY,
            part: "statistics",
            id: videoIds,
          },
        }
      );

      setVideos((prevVideos) =>
        prevVideos.map((video, index) => ({
          ...video,
          statistics: response.data.items[index].statistics,
        }))
      );
    } catch (error) {
      console.error("Error fetching video statistics:", error);
    }
  };

  const switchToGrid = () => {
    setViewMode("grid");
  };

  const switchToList = () => {
    setViewMode("list");
  };

  return (
    <>
      <WrapperSerchContainer>
        <WrapperSerch searchChange={searchChange}>
          <H1 searchChange={searchChange}>Поиск видео</H1>
          <WrapperInput searchChange={searchChange}>
            <Space.Compact style={{ width: "100%" }}>
              <InputStyle
                placeholder="что хотите посмотреть?"
                value={query}
                onChange={handleChange}
                searchChange={searchChange}
                suffix={
                  searchChange && (
                    <HeartOutlined
                      onClick={showModal}
                      style={{ cursor: "pointer" }}
                    />
                  )
                }
              />
              <Button
                type="primary"
                style={{ width: "150px", height: "50px" }}
                onClick={handleSubmit}
              >
                Найти
              </Button>
            </Space.Compact>
          </WrapperInput>

          {searchChange && (
            <FilterPanelWrapper>
              <p
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                }}
              >
                Видео по запросу «{query}»
              </p>
              <div>
                <FilterPaneButtons onClick={switchToList}>
                  <BarsOutlined
                    style={{ opacity: viewMode === "list" ? "100%" : "30%" }}
                  />
                </FilterPaneButtons>
                <FilterPaneButtons onClick={switchToGrid}>
                  <AppstoreOutlined
                    style={{ opacity: viewMode === "grid" ? "100%" : "30%" }}
                  />
                </FilterPaneButtons>
              </div>
            </FilterPanelWrapper>
          )}
          <WrapperVideo
            className={viewMode === "grid" ? "gridFilter" : "listFilter"}
          >
            {videos.map((video) => (
              <ItemVideo key={video.id.videoId}   style={viewMode === "grid" ? {  } : {display: 'flex'}}> 
                <iframe
                  height="140px"
                  border-radius="10px"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                />
                <div style={{marginLeft:'20px',
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center", }}>
                  <p
                    style={{
                      marginTop: "5px",
                      overflow: "hidden",
                      fontWeight: "bold",
                      textOverflow: "ellipsis",
                      maxHeight: "70px",
                    }}
                  >
                    {video.snippet.title}
                  </p>
                  <p style={{ opacity: "30%", margin: "0px" }}>
                    {video.snippet.channelTitle}
                  </p>
                  {video.statistics && video.statistics.viewCount && (
                    <p style={{ opacity: "30%", margin: "0px" }}>
                      {Math.round(Number(video.statistics.viewCount) / 1000)}{" "}
                      тыс. просмотров
                    </p>
                  )}
                </div>
              </ItemVideo>
            ))}
          </WrapperVideo>
        </WrapperSerch>
      </WrapperSerchContainer>
      <ModalWindow />
    </>
  );
};

export default InputSearch;
