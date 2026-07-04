import { Form, Input, InputNumber, Select, Typography } from "antd";

import styles from "./CreateTransactionPage.module.css"
import AppForm from "../../features/AppForm/AppForm.tsx";
import { CATEGORY_TYPES } from "../../entities/Category/types.ts";

const {Title} = Typography;


const CreateTransactionPage = () => {
  const [form] = Form.useForm();

  const onFinish = async () => {
    console.log("onFinish");
  }


  return (
    <div className={styles.CreateTransactionPage}>
      <Title level={1}>CreateTransactionPage</Title>

      <AppForm
        form={form}
        title="Create Dish"
        formBtn="Save"
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


        <Form.Item
          label="Amount"
          name="amount"
          rules={[{
            required: true,
            type: 'number',
            message: 'Please enter valid number!'
          }]}
        >
          <InputNumber style={{width: "100%"}} />
        </Form.Item>
      </AppForm>
    </div>
  );
};

export default CreateTransactionPage;