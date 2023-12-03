import { Table } from "react-bootstrap";
import IExpenseItem from "../models/expense";
import {
  getAllPayeeNames,
  getTotalContributedAmount,
  getGrandTotalExpenses,
} from "../services/expense-utils";

type ExpensesByPayeesModel = {
  expenseItems: IExpenseItem[];
};

const ExpensesByPayees = ({ expenseItems }: ExpensesByPayeesModel) => {
  return (
    <div style={{ marginTop: "40px" }}>
      <Table striped bordered hover>
        <tbody>
          {getAllPayeeNames(expenseItems).map((payeeName, index) => {
            return (
              <tr key={index}>
                <td>{payeeName}</td>
                <td>{getTotalContributedAmount(payeeName, expenseItems)}</td>
              </tr>
            );
          })}

          <tr>
            <td>Total</td>
            <td>{getGrandTotalExpenses(expenseItems)}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
};

export { ExpensesByPayees };
