import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';

import { toast, ToastContainer } from 'react-toastify';

import { useExpenditureFetcher } from '../../services/expenditures-fetcher-service';
import AddExpenditureButton from '../addExpenditureButton/addExpenditureButton';

import * as styles from './styles';
import 'react-toastify/dist/ReactToastify.css';

const AddExpenditureForm = loadable(
  () => import('../addExpenditureForm/addExpenditureForm')
);
const ExpenditureTable = loadable(
  () => import('../expenditureTable/expenditureTable')
);

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
      <styles.ExpenditureContainer>
        {open ? (
          <AddExpenditureForm id={id} closeForm={() => setOpen(false)} />
        ) : (
          <ExpenditureTable items={expenditures!} />
        )}
        <AddExpenditureButton open={open} clickHandler={addClickHandler} />
      </styles.ExpenditureContainer>
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
