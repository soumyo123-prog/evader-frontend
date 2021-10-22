/* eslint-disable import/prefer-default-export */
import React from 'react';
import axios from '../context/axios';
import { useAuth } from '../context/auth';
import { ExpenditureType } from '../types/types';

export const useExpenditureFetcher = (eventId: string) => {
  const { token } = useAuth();
  const [expenditures, setExpenditures] = React.useState<ExpenditureType[]>();
  const [error, setError] = React.useState<number | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    axios
      .get<ExpenditureType[]>(`event/expenditure/${eventId}/`, {
        headers: { Authorization: `Token ${token}` },
      })
      .then((res) => {
        if (isMounted) {
          setExpenditures(res.data);
        }
      })
      .catch((err: any) => {
        if (isMounted) {
          setError(err.response.status);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return {
    expenditures,
    error,
  };
};
