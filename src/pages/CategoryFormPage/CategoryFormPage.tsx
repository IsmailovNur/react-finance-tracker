import { Form, Input, Select, Typography } from "antd";

import styles from "./CategoryFormPage.module.css";
import AppForm from "../../features/AppForm/AppForm.tsx";
import {
  CATEGORY_TYPES,
  type Category
} from "../../entities/Category/types.ts";
import type { AppDispatch } from "../../app/store.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  selectCategoryIsLoading, selectCategoryList, updateCategory
} from "../../entities/Category/CategorySlice.ts";
import { useNavigate, useParams } from "react-router-dom";
import { AppRoutes } from "../../routing/routes.ts";
import { useEffect } from "react";

const {Title} = Typography;

const CategoryFormPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();

  const isLoading = useSelector(selectCategoryIsLoading);
  const categories = useSelector(selectCategoryList);

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit && id) {
      const currentCategory = categories.find(cat => cat.id === id);
      if (currentCategory) {
        form.setFieldsValue({
          name: currentCategory.name,
          type: currentCategory.type,
        });
      }
    } else {
      form.resetFields();
    }
  }, [isEdit, id, categories, form]);

  const onFinish = async (values: Category) => {
    try {
      if (isEdit && id) {
        await dispatch(updateCategory({id, data: values}));
      } else {
        await dispatch(createCategory(values));
      }
      
      form.resetFields();
      navigate(AppRoutes.categories);
    } catch (error) {
      console.error("CreateCategory error:", error);
    }
  };

  return (
    <div className={styles.CreateCategoryPage}>
      <Title level={1}>{isEdit ? "Edit Category" : "Create Category"}</Title>

      <AppForm
        form={form}
        title={isEdit ? "Edit Category details" : "Create Category"}
        formBtn={isEdit ? "Update" : "Save"}
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

export default CategoryFormPage;