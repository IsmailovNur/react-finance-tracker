import { Form, Input, Select, Typography } from "antd";

import styles from "./CreateCategoryPage.module.css";
import AppForm from "../../features/AppForm/AppForm.tsx";
import {
  CATEGORY_TYPES,
  type Category
} from "../../entities/Category/types.ts";
import type { AppDispatch } from "../../app/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  selectCategoryIsLoading
} from "../../entities/Category/CategorySlice.ts";

const {Title} = Typography;
const CreateCategoryPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const isLoading = useSelector(selectCategoryIsLoading);

  const onFinish = async (values: Category) => {
    try {
      await dispatch(createCategory(values));
      form.resetFields();
    } catch (error) {
      console.error("CreateCategory error:", error);
    }
  }

  return (
    <div className={styles.CreateCategoryPage}>
      <Title level={1}>CreateCategoryPage</Title>

      <AppForm
        form={form}
        title="Create Category"
        formBtn="Save"
        isLoading={isLoading}
        onFinish={onFinish}
      >
        <Form.Item
          label="Category Name"
          name="name"
          rules={[{
            required: true,
            whitespace: true,
            message: 'Please enter valid word',
          }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Type"
          name="type"
          rules={[{
            required: true,
            message: 'Please choose type!',
          }]}
        >
          <Select
            style={{width: "100%"}}
            placeholder="Select type ..."
            options={CATEGORY_TYPES.map(cat => ({
              value: cat.id,
              label: cat.name
            }))}
          />
        </Form.Item>
      </AppForm>
    </div>
  );
};

export default CreateCategoryPage;