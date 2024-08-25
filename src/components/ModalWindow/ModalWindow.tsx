import React, { useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  Row,
  Col,
  Slider,
  InputNumber,
  Button,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import {
  setOpenModalWindow,
  setInputValue,
  addQuery,
  deleteQuery,
} from "../../redux/slice/savedQueriesSlice";

const ModalWindow: React.FC = () => {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(
    (state: RootState) => state.savedQueries.openModalWindow
  );
  const inputValue = useSelector(
    (state: RootState) => state.savedQueries.inputValue
  );
  const currentQueryId = useSelector(
    (state: RootState) => state.savedQueries.currentQueryId
  );
  const savedQueries = useSelector(
    (state: RootState) => state.savedQueries.savedQueries
  );
  const query = useSelector((state: RootState) => state.savedQueries.query);

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentQueryId) {
      const currentQuery = savedQueries.find(
        (item) => item.id === currentQueryId
      );
      if (currentQuery) {
        form.setFieldsValue(currentQuery);
        dispatch(setInputValue(currentQuery.maxAmount || 12));
      }
    } else {
      form.resetFields();
      form.setFieldsValue({ query, maxAmount: 12 });
      dispatch(setInputValue(12));
    }
  }, [savedQueries, query]);

  const handleCancel = () => {
    dispatch(setOpenModalWindow(false));
  };

  const onChange = (value: number | null) => {
    if (value !== null) {
      dispatch(setInputValue(value));
      form.setFieldsValue({ maxAmount: value });
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const updatedTask = {
        id: currentQueryId || "",
        title: values.title,
        maxAmount: values.maxAmount || inputValue,
        sortBy: values.sortBy,
        query: values.query,
      };
      if (currentQueryId) {
        dispatch(deleteQuery(currentQueryId));
      }
      dispatch(addQuery(updatedTask));
      dispatch(setOpenModalWindow(false));
    } catch (error) {
      console.error("Ошибка при сохранении задачи:", error);
    }
  };

  return (
    <Modal
      title={<h3>Сохранить запрос</h3>}
      open={isModalOpen}
      onCancel={handleCancel}
      style={{ maxWidth: "510px", textAlign: "center" }}
      footer={[
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button
            key="cancel"
            onClick={handleCancel}
            style={{ width: "220px", height: "40px", fontSize: "16px" }}
          >
            Не сохранять
          </Button>
          <Button
            key="submit"
            type="primary"
            onClick={handleSubmit}
            style={{
              width: "220px",
              height: "40px",
              fontSize: "16px",
              marginLeft: "10px",
            }}
          >
            Сохранить
          </Button>
        </div>,
      ]}
    >
      <Form form={form} layout="horizontal">
        <Form.Item label="Запрос" name="query">
          <Input readOnly={!currentQueryId} />
        </Form.Item>

        <Form.Item
          label="Название"
          name="title"
          rules={[{ required: true, message: "Пожалуйста, укажите название" }]}
        >
          <Input placeholder="Укажите название" />
        </Form.Item>
        <Form.Item label="Сортировать по:" name="sortBy">
          <Select>
            <Select.Option value="byRelevance">По релевантности</Select.Option>
            <Select.Option value="dateOfDownload">
              По дате загрузки
            </Select.Option>
            <Select.Option value="basedOnViews">
              По числу просмотров
            </Select.Option>
            <Select.Option value="byRating">По рейтингу</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Максимальное количество" name="maxAmount">
          <Row style={{ width: "350px" }}>
            <Col span={12}>
              <Slider
                min={1}
                max={50}
                onChange={onChange}
                value={typeof inputValue === "number" ? inputValue : 0}
              />
            </Col>
            <Col span={4}>
              <InputNumber
                min={1}
                max={50}
                style={{ marginLeft: "10px" }}
                value={inputValue}
                onChange={onChange}
              />
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ModalWindow;
