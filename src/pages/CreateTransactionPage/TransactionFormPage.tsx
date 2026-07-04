import { Form, InputNumber, Select, Typography } from "antd";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/store.ts";
import AppForm from "../../features/AppForm/AppForm.tsx";
import { AppRoutes } from "../../routing/routes.ts";
import {
  type Category,
  CATEGORY_TYPES
} from "../../entities/Category/types.ts";
import {
  fetchCategories,
  selectCategoryList
} from "../../entities/Category/CategorySlice.ts";
import {
  createTransaction,
  selectTransactionIsLoading,
  selectTransactionList,
  updateTransaction
} from "../../entities/Transaction/TransactionSlice.ts";
import type {
  TransactionFormValues
} from "../../entities/Transaction/types.ts";
import styles from "./TransactionFormPage.module.css";

const {Title} = Typography;

const TransactionFormPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {id} = useParams<{ id: string }>();
  const isEdit = Boolean(id);

  const isLoading = useSelector(selectTransactionIsLoading);
  const categories = useSelector((state: RootState) => selectCategoryList(state));
  const transactions = useSelector(selectTransactionList);

  const selectedType = Form.useWatch('type', form);

  const prevTypeRef = useRef<string | undefined>(undefined);

  const isDataLoaded = transactions.length > 0 && categories.length > 0;

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && id && isDataLoaded) {
      const currentTransaction = transactions.find(t => t.id === id);
      if (!currentTransaction) return;

      const currentCat = categories.find(c => c.id === currentTransaction.categoryId);
      const transactionType = currentCat ? currentCat.type : undefined;

      prevTypeRef.current = transactionType;

      form.setFieldsValue({
        type: transactionType,
        category: currentTransaction.categoryId,
        amount: currentTransaction.amount,
      });
    }

    if (!isEdit) {
      form.resetFields();
    }
  }, [isEdit, id, transactions, categories, form, isDataLoaded]);

  useEffect(() => {
    if (prevTypeRef.current !== undefined && prevTypeRef.current !== selectedType) {
      form.setFieldsValue({category: undefined});
    }
    prevTypeRef.current = selectedType;
  }, [selectedType, form]);

  const filteredCategories = selectedType
    ? categories.filter(cat => cat.type === selectedType)
    : [];

  const onFinish = async (values: Category | TransactionFormValues) => {
    try {
      const formData = values as TransactionFormValues;

      if (isEdit && id) {
        const currentTransaction = transactions.find(t => t.id === id);
        await dispatch(updateTransaction({
          id,
          data: {
            categoryId: formData.category,
            amount: formData.amount,
            createdAt: currentTransaction ? currentTransaction.createdAt : new Date().toISOString()
          }
        }));
      } else {
        await dispatch(createTransaction({
          categoryId: formData.category,
          amount: formData.amount,
          createdAt: new Date().toISOString()
        }));
      }

      form.resetFields();
      navigate(AppRoutes.main);
    } catch (error) {
      console.error("Submit transaction error:", error);
    }
  };

  return (
    <div className={styles.CreateTransactionPage}>
      <Title level={1}>{isEdit ? "Edit Transaction" : "Create Transaction"}</Title>
      <AppForm
        form={form}
        title={isEdit ? "Edit Transaction Details" : "Add Transaction"}
        formBtn={isEdit ? "Update" : "Save"}
        isLoading={isLoading}
        onFinish={onFinish}
      >
        <Form.Item
          label="Type"
          name="type"
          rules={[{required: true, message: 'Please choose type!'}]}
        >
          <Select
            placeholder="Select type ..."
            options={CATEGORY_TYPES.map(cat => ({
              value: cat.id,
              label: cat.name
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name="category"
          rules={[{required: true, message: 'Please choose category!'}]}
        >
          <Select
            placeholder="Select category ..."
            disabled={!selectedType}
            options={filteredCategories.map(cat => ({
              value: cat.id,
              label: cat.name
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Amount (KGS)"
          name="amount"
          rules={[{
            required: true,
            type: 'number',
            min: 1,
            message: 'Please enter valid number!'
          }]}
        >
          <InputNumber placeholder="Number ..." style={{width: "100%"}} />
        </Form.Item>
      </AppForm>
    </div>
  );
};

export default TransactionFormPage;