import type { FormInstance } from "antd";
import { Button, Card, Form, Typography } from "antd";
import styles from "./AppForm.module.css";
import { SaveOutlined } from "@ant-design/icons";
import type { FC, ReactNode } from "react";
import type { Category } from "../../entities/Category/types.ts";

const {Title} = Typography;

interface AppFormProps {
  form: FormInstance,
  title: string,
  formBtn: string,
  onFinish: (values: Category) => void,
  children: ReactNode;
  isLoading?: boolean;
}

const AppForm: FC<AppFormProps> = (props) => {
  const {form, title, formBtn, onFinish, children, isLoading} = props;

  return (
    <Card className={styles.AppForm}>
      <Title level={2}>{title}</Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={true}
      >
        {children}
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={isLoading}
          icon={<SaveOutlined />}
        >
          {formBtn}
        </Button>
      </Form>
    </Card>
  );
};

export default AppForm;