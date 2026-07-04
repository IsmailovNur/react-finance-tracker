import { type FC } from 'react';
import type { CategoryType } from "../types.ts";

import { Button, Popconfirm, Typography } from "antd";
import styles from "./Category.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const {Text} = Typography;

interface CategoryItemProps {
  name: string;
  type: CategoryType;
  id: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CategoryItem: FC<CategoryItemProps> = (props) => {
  const {name, type, id, onEdit, onDelete} = props;

  return (
    <div className={styles.CategoryItem}>
      <Text className={styles.categoryName}>{name}</Text>
      <Text strong className={styles.categoryType}>
        {type}
      </Text>
      <div className={styles.categoryButtons}>
        <Button
          icon={<EditOutlined />}
          onClick={() => onEdit(id)}
        >
          Edit
        </Button>

        <Popconfirm
          title="Delete the category"
          description="Are you want to delete this category?"
          onConfirm={() => onDelete(id)}
          okText="Yes"
          cancelText="No"
          okButtonProps={{danger: true}}
        >
          <Button
            danger
            icon={<DeleteOutlined />}
          >
            Delete
          </Button>
        </Popconfirm>

      </div>
    </div>
  );
};

export default CategoryItem;