import React, { PropsWithChildren } from 'react';

import * as styles from './styles';

export default function EventNavbarActive({
  active,
}: PropsWithChildren<{ active: string }>) {
  return <styles.Active>{active}</styles.Active>;
}
