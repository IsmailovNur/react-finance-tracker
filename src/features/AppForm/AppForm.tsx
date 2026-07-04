import type { FormInstance } from "antd";
import { Button, Card, Form, Typography } from "antd";
import styles from "./AppForm.module.css";
import { SaveOutlined } from "@ant-design/icons";
import type { FC, ReactNode } from "react";

const {Title} = Typography;

interface AppFormProps {
  form: FormInstance,
  title: string,
  formBtn: string,
  onFinish: () => void,
  children: ReactNode;
}

const AppForm: FC<AppFormProps> = (props) => {
  const {form, title, formBtn, onFinish, children} = props;

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
          icon={<SaveOutlined />}
        >
          {formBtn}
        </Button>
      </Form>
    </Card>
  );
};

export default AppForm;