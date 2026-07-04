import type { AppDispatch } from "../../../app/store";
import styles from "./Transaction.module.css"
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTransaction,
  fetchTransactions,
  selectTransactionIsLoading,
  selectTransactionList
} from "../TransactionSlice";
import {
  fetchCategories,
  selectCategoryList
} from "../../Category/CategorySlice.ts";
import { useEffect } from "react";
import Spinner from "../../../shared/Spinner/Spinner.tsx";
import TransactionItem from "./TransactionItem.tsx";
import { AppRoutes } from "../../../routing/routes.ts";
import { useNavigate } from "react-router-dom";

const TransactionList = () => {
  const dispatch = useDispatch<AppDispatch>();

  const transactions = useSelector(selectTransactionList);
  const categories = useSelector(selectCategoryList);
  const isTxLoading = useSelector(selectTransactionIsLoading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (isTxLoading) return <Spinner />;

  const validTransactions = transactions
    .map(tx => {
      const cat = categories.find(c => c.id === tx.categoryId);
      return {...tx, categoryData: cat};
    })
    .filter(tx => tx.categoryData !== undefined);

  const sortedTransactions = [...validTransactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = validTransactions.reduce((acc, tx) => {
    return tx.categoryData?.type === 'income' ? acc + tx.amount : acc - tx.amount;
  }, 0);

  return (
    <div className={styles.TransactionListContainer}>
      <div className={styles.totalBlock}>
        Total: <span className={total >= 0 ? styles.positive : styles.negative}>{total} KGS</span>
      </div>

      <div className={styles.TransactionList}>
        {sortedTransactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            id={transaction.id}
            categoryName={transaction.categoryData!.name}
            type={transaction.categoryData!.type}
            amount={transaction.amount}
            createdAt={transaction.createdAt}
            onDelete={(id) => dispatch(deleteTransaction(id))}
            onEdit={(id) => navigate(AppRoutes.editTransaction.replace(':id', id))}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionList;