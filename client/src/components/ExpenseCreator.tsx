import { Button, Modal, Form } from "react-bootstrap";
import { useState, FormEvent, useRef } from "react";
import IExpenseItem, { IExpenseCreateItem } from "../models/expense";
import { getAllPayeeNames } from "../services/expense-utils";
import { createNewExpenseItem } from "../services/expense-service";

type ExpenseCreatorModel = {
  expenseItems: IExpenseItem[];
  refresh: (newExpenseItem: IExpenseItem) => void;
};

const ExpenseCreator = ({ expenseItems, refresh }: ExpenseCreatorModel) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const expenseDescriptionRef = useRef<HTMLInputElement>(null);
  const payeeNameRef = useRef<HTMLSelectElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const expenseDateRef = useRef<HTMLInputElement>(null);
  const handleExpenseCreate = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const expenseDescription = expenseDescriptionRef?.current?.value as string;

    const payeeName = payeeNameRef?.current?.value as string;

    const price = parseFloat(priceRef?.current?.value as string);

    const expenseDate = new Date(expenseDateRef?.current?.value as string);
    const newExpenseItemObj: IExpenseCreateItem = {
      expenseDescription: expenseDescription,
      payeeName: payeeName,
      price: price,
      date: expenseDate,
    };

    const response = await createNewExpenseItem(newExpenseItemObj);
    refresh(response);
    console.log(response);
    handleClose();
  };

  const createExpenseModalBody = () => {
    return (
      <Form onSubmit={handleExpenseCreate}>

        <Form.Group className="mb-3" controlId="payeeName">
          <Form.Label>Name</Form.Label>

          <Form.Select aria-label="Default select example" ref={payeeNameRef}>
            <option>Choose</option>

            {getAllPayeeNames(expenseItems).map((payeeName) => {
              return <option value={payeeName} key={payeeName}>{payeeName}</option>;
            })}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseDescription">
          <Form.Label>Product Purchased</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter expense description"
            ref={expenseDescriptionRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="price">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter expense price"
            ref={priceRef}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expenseDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" ref={expenseDateRef} />
        </Form.Group>

        <Button variant="primary" type="submit" style={{marginRight:"20px"}}>
          Submit
        </Button>

        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Form>
    );
  };

  return (
    <div>
      <Button variant="primary" onClick={handleShow} style={{float:"right"}}>
        Add
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add New Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>{createExpenseModalBody()}</Modal.Body>
      </Modal>
    </div>
  );
};

export { ExpenseCreator };
