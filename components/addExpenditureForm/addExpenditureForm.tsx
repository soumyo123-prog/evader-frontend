/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { AddExpenditure } from '../../services/add-expenditure-service';
import { useAuth } from '../../context/auth';
import EventEmitterService from '../../services/event-emitter-service';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

export default function AddExpenditureForm({
  id,
  closeForm,
}: PropsWithChildren<{ id: string; closeForm: () => void }>) {
  const [name, setName] = React.useState<string>('');
  const [organization, setOrganization] = React.useState<string>('');
  const [unitPrice, setUnitPrice] = React.useState<number>(0);
  const [quantity, setQuantity] = React.useState<number>(0);
  const { token } = useAuth();

  const changeNameHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setName(e.target.value);
  };

  const changeOrganizationHandler: React.ChangeEventHandler<HTMLInputElement> =
    (e) => {
      setOrganization(e.target.value);
    };

  const changeUnitPriceHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setUnitPrice(Number(e.target.value));
  };

  const changeQuantityHandler: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    setQuantity(Number(e.target.value));
  };

  const submitExpenditureHandler: React.FormEventHandler<HTMLFormElement> =
    async (e) => {
      e.preventDefault();

      try {
        const expenditure = await AddExpenditure(
          token!,
          id,
          name,
          organization,
          unitPrice,
          quantity
        );
        EventEmitterService('add_expenditure', expenditure.data);
        closeForm();
      } catch (err: any) {
        toast.error(err.response.data.error);
      }
    };

  return (
    <>
      <styles.Form onSubmit={submitExpenditureHandler}>
        <styles.Heading>Add Expenditure</styles.Heading>
        <styles.Input
          type="text"
          placeholder="Name"
          onChange={changeNameHandler}
          value={name}
        />
        <styles.Input
          type="text"
          placeholder="Organization"
          onChange={changeOrganizationHandler}
          value={organization}
        />
        <styles.Input
          type="number"
          placeholder="Unit Price"
          onChange={changeUnitPriceHandler}
          min="0"
        />
        <styles.Input
          type="number"
          placeholder="Quantity"
          onChange={changeQuantityHandler}
          min="1"
        />
        <styles.Submit type="submit" color="primary">
          Submit
        </styles.Submit>
      </styles.Form>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}
