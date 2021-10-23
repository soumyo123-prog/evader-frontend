/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PropsWithChildren } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import classes from './addExpenditureForm.module.scss';
import 'react-toastify/dist/ReactToastify.css';
import { AddExpenditure } from '../../services/add-expenditure-service';
import { useAuth } from '../../context/auth';
import EventEmitterService from '../../services/event-emitter-service';

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
        toast(err.response.data.error);
      }
    };

  return (
    <>
      <form
        onSubmit={submitExpenditureHandler}
        className={[
          'd-flex flex-column justify-content-center align-items-center',
          classes.add_expenditure_form,
        ].join(' ')}
      >
        <p className={['h3 text-primary mb-5'].join(' ')}> Add Expenditure </p>
        <input
          type="text"
          className={[
            'rounded p-2 mb-3',
            classes.add_expenditure_form_input,
          ].join(' ')}
          placeholder="Name"
          onChange={changeNameHandler}
          value={name}
        />
        <input
          type="text"
          className={[
            'rounded p-2 mb-3',
            classes.add_expenditure_form_input,
          ].join(' ')}
          placeholder="Organization"
          onChange={changeOrganizationHandler}
          value={organization}
        />
        <input
          type="number"
          className={[
            'rounded p-2 mb-3',
            classes.add_expenditure_form_input,
          ].join(' ')}
          placeholder="Unit Price"
          onChange={changeUnitPriceHandler}
          min="0"
        />
        <input
          type="number"
          className={['rounded p-2', classes.add_expenditure_form_input].join(
            ' '
          )}
          placeholder="Quantity"
          onChange={changeQuantityHandler}
          min="1"
        />
        <button type="submit" className={['btn btn-primary mt-5'].join(' ')}>
          Submit
        </button>
      </form>
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
