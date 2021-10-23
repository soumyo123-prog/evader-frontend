import React, { PropsWithChildren } from 'react';

import { ExpenditureType } from '../../types/types';

import * as styles from './styles';

export default function ExpenditureTableRow({
  data,
}: PropsWithChildren<{ data: ExpenditureType }>) {
  return (
    <tr>
      <styles.TableData>
        <styles.Name>{data.name}</styles.Name>
        <styles.Organization>{data.organization}</styles.Organization>
      </styles.TableData>
      <styles.TableData>{data.unitPrice}</styles.TableData>
      <styles.TableData>{data.quantity}</styles.TableData>
    </tr>
  );
}
