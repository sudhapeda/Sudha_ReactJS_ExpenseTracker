import { Table } from "react-bootstrap";
import IExpenseItem from "../models/expense";

type ExpenseItemsListerModel = {
  expenseItems: IExpenseItem[];
};

const ExpenseItemsLister = ({ expenseItems }: ExpenseItemsListerModel) => {
  const testExpenseItems: IExpenseItem[] = [
    {
      expenseDescription: "Internet Expenses",
      payeeName: "Ramesh",
      price: 1100,
      date: new Date(),
      id: 1,
    },
    {
      expenseDescription: "Bike Maintainence Expenses",
      payeeName: "Rahul",
      price: 3500,
      date: new Date(),
      id: 2,
    },
  ];

  const getExpenseItems = () => {
    return expenseItems;
  };

  const formatDate = (dateObjFromServer: Date) => {
    const dateObj = new Date(dateObjFromServer);

    return (
      dateObj.getDate() +
      "-" +
      (dateObj.getMonth() + 1) +
      "-" +
      dateObj.getFullYear()
    );
  };

  return (
    <div style={{marginTop:"5%"}}>
      <Table striped bordered hover>
        <thead style={{backgroundColor:"black", color:"white"}}>
          <tr>
            <th>#</th>
            <th>Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Payee</th>
          </tr>
        </thead>
        <tbody>
          {getExpenseItems().map((expenseItem, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{formatDate(expenseItem.date)}</td>
                <td>{expenseItem.expenseDescription}</td>
                <td>{expenseItem.price}</td>
                <td>{expenseItem.payeeName}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};

export { ExpenseItemsLister };
