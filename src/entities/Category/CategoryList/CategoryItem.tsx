import { type FC } from 'react';
import type { CategoryType } from "../types.ts";

import { Button, Typography } from "antd";
import styles from "./Category.module.css";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

const {Text} = Typography;

interface CategoryItemProps {
  name: string;
  type: CategoryType;
  id: string;
}

const CategoryItem: FC<CategoryItemProps> = ({name, type, id}) => {
  return (
    <div className={styles.CategoryItem}>
      <Text className={styles.categoryName}>{name}</Text>
      <Text strong className={styles.categoryType}>
        {type}
      </Text>
      <div className={styles.categoryButtons}>
        <Button
          icon={<EditOutlined />}
        >
          Edit
        </Button>
        <Button
          danger
          icon={<DeleteOutlined />}
          onClick={() => console.log("Delete category", id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CategoryItem;