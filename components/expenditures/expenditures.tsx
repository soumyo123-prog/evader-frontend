import React, { PropsWithChildren } from 'react';

import { ExpenditureType } from '../../types/types';

import * as styles from './styles';

export default function Expenditures({
  items,
}: PropsWithChildren<{ items: ExpenditureType[] }>) {
  console.log(items);
  return (
    <div>
      <div>I am the thing</div>
    </div>
  );
}
