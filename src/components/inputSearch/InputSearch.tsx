import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Modal,
  Form,
  Input,
  Select,
  Col,
  InputNumber,
  Row,
  Slider,
  Space,
} from "antd";

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
import {
  HeartOutlined,
  AppstoreOutlined,
  BarsOutlined,
} from "@ant-design/icons";

// import ModalWindow from '../ModalWindow/ModalWindow';
import { NavLink, useNavigate } from "react-router-dom";

const API_KEY = "AIzaSyD74dyEu5vEaGZAJZeLLCbZfYMKCvyAooU";

const InputSearch: React.FC = () => {
  const [query, setQuery] = useState(""); // для хранения значения запроса
  const [videos, setVideos] = useState<any[]>([]); //  для хранения результатов поиска видео
  const [searchChange, setSearchChange] = useState(false); // Флаг для отображения изменений в поиске
  const [viewMode, setViewMode] = useState<"grid" | "list">("list"); 
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [inputValue, setInputValue] = useState(1);

  const onChange = (value: number | null) => {
    if (value !== null) {
      setInputValue(value);
    }
  };
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
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
      setVideos(response.data.items);
      setSearchChange(true);
      fetchVideoStatistics(response.data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const fetchVideoStatistics = async (videos: any[]) => {
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
                  <HeartOutlined
                    onClick={showModal}
                    style={{ cursor: "pointer" }}
                  />
                }
              />

              <Modal
                title={<h3>Сохранить запрос </h3>}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
              >
                <Form layout="horizontal">
                  <Form.Item label="Запрос">
                    <Input readOnly placeholder={query} />
                  </Form.Item>
                  <Form.Item
                    label="Название"
                    name="Название"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Укажите название" />
                  </Form.Item>
                  <Form.Item label="Сортировать по:">
                    <Select>
                      <Select.Option value="demo">Demo</Select.Option>
                    </Select>

                    <Row>
                      <Col span={12}>
                        <Slider
                          min={1}
                          max={50}
                          onChange={onChange}
                          value={
                            typeof inputValue === "number" ? inputValue : 0
                          }
                        />
                      </Col>
                      <Col span={4}>
                        <InputNumber
                          min={1}
                          max={50}
                          style={{ margin: "0 16px" }}
                          value={inputValue}
                          onChange={onChange}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </Form>
              </Modal>

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
                }}
              >
                Видео по запросу "{query}"
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
              <ItemVideo key={video.id.videoId}>
                <iframe
                  height="140px"
                  border-radius="10px"
                  src={`https://www.youtube.com/embed/${video.id.videoId}`}
                  title={video.snippet.title}
                />
                <div>
                  <p
                    style={{
                      margin: "0px",
                      overflow: "hidden",
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
                      {Math.round(video.statistics.viewCount / 1000)} тыс.
                      просмотров
                    </p>
                  )}
                </div>
              </ItemVideo>
            ))}
          </WrapperVideo>
        </WrapperSerch>
      </WrapperSerchContainer>
    </>
  );
};

export default InputSearch;
