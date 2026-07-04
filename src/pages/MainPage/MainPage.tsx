import { Typography } from "antd";
import "./MainPage.css";
import TransactionList
  from "../../entities/Transaction/TransactionList/TransactionList.tsx";

const {Title} = Typography;

const MainPage = () => {
  return (
    <div>
      <Title level={1}>Main Page</Title>
      <TransactionList />
    </div>
  );
};

export default MainPage;