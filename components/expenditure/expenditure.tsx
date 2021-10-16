import loadable from '@loadable/component';
import React, { PropsWithChildren } from 'react';
import AddExpenditureButton from '../addExpenditureButton/addExpenditureButton';
import classes from './expenditure.module.scss';

const AddExpenditureForm = loadable(
  () => import('../addExpenditureForm/addExpenditureForm')
);

export default function Expenditure({ id }: PropsWithChildren<{ id: string }>) {
  const [open, setOpen] = React.useState(false);

  const addClickHandler = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className={[classes.expenditure_container].join(' ')}>
      {open ? <AddExpenditureForm id={id} /> : null}
      <AddExpenditureButton open={open} clickHandler={addClickHandler} />
    </div>
  );
}
