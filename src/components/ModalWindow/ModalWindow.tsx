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
  const currentQueryIndex = useSelector(
    (state: RootState) => state.savedQueries.currentQueryIndex
  );
  const savedQueries = useSelector(
    (state: RootState) => state.savedQueries.savedQueries
  );
  const query = useSelector((state: RootState) => state.savedQueries.query);

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentQueryIndex !== null) {
      const currentQuery = savedQueries[currentQueryIndex];
      if (currentQuery) {
        form.setFieldsValue(currentQuery);
        if (currentQuery.maxAmount !== undefined) {
          dispatch(setInputValue(currentQuery.maxAmount));
        } else {
          dispatch(setInputValue(12));
        }
      }
    } else {
      form.resetFields();
      form.setFieldsValue({ query, maxAmount: 12 });
      dispatch(setInputValue(12));
    }
  }, [currentQueryIndex, form, savedQueries, dispatch, query]);

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
        title: values.title,
        maxAmount: values.maxAmount || inputValue,
        sortBy: values.sortBy,
        query: query,
      };
      if (currentQueryIndex !== null) {
        dispatch(deleteQuery(currentQueryIndex));
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
        <Button
          key="cancel"
          onClick={handleCancel}
          style={{ width: "49%", height: "40px", fontSize: "16px" }}
        >
          Не сохранять
        </Button>,
        <Button
          key="submit"
          type="primary"
          onClick={handleSubmit}
          style={{ width: "49%", height: "40px", fontSize: "16px" }}
        >
          Сохранить
        </Button>,
      ]}
    >
      <Form form={form} layout="horizontal">
        <Form.Item label="Запрос">
          <Input
            readOnly
            value={
              currentQueryIndex !== null
                ? savedQueries[currentQueryIndex].query
                : query
            }
          />
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
