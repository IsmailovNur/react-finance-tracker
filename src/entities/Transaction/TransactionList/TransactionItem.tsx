import type { FC } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Typography } from "antd";
import dayjs from "dayjs";

import styles from "./Transaction.module.css";

const { Text } = Typography;

interface TransactionItemProps {
  id: string;
  categoryName: string;
  type: "income" | "expense";
  amount: number;
  createdAt: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const TransactionItem: FC<TransactionItemProps> = (props) => {
  const { id, categoryName, type, amount, createdAt, onEdit, onDelete } = props;
  const isIncome = type === 'income';

  return (
    <div className={styles.TransactionItem}>
      <Text className={styles.transactionDate}>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</Text>
      <Text className={styles.transactionCategory}>{categoryName}</Text>
      <Text
        strong
        className={isIncome ? styles.incomeAmount : styles.expenseAmount}
      >
        {isIncome ? `+${amount}` : `-${amount}`} KGS
      </Text>

      <div className={styles.transactionButtons}>
        <Button icon={<EditOutlined />} onClick={() => onEdit(id)} />
        <Popconfirm
          title="Delete transaction"
          description="Are you sure you want to delete this transaction?"
          onConfirm={() => onDelete(id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <Button danger icon={<DeleteOutlined />} />
        </Popconfirm>
      </div>
    </div>
  );
};

export default TransactionItem;