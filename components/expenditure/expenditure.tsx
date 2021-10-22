import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import { useExpenditureFetcher } from '../../services/expenditures-fetcher-service';
import AddExpenditureButton from '../addExpenditureButton/addExpenditureButton';

import classes from './expenditure.module.scss';
import 'react-toastify/dist/ReactToastify.css';

const AddExpenditureForm = loadable(
  () => import('../addExpenditureForm/addExpenditureForm')
);
const Expenditures = loadable(() => import('../expenditures/expenditures'));

export default function Expenditure({ id }: PropsWithChildren<{ id: string }>) {
  const [open, setOpen] = React.useState(false);
  const { expenditures, error } = useExpenditureFetcher(id);

  React.useEffect(() => {
    if (error) {
      toast('Something went wrong!');
    }
  }, []);

  const addClickHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <div className={[classes.expenditure_container].join(' ')}>
        {open ? (
          <AddExpenditureForm id={id} />
        ) : (
          <Expenditures items={expenditures!} />
        )}
        <AddExpenditureButton open={open} clickHandler={addClickHandler} />
      </div>
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
