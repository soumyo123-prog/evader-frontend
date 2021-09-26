import axios from '../context/axios';
import { EventType } from '../types/types';

export default function eventsFetcher(token: string) {
  return axios.get<EventType[]>('event/fetch/', {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
}
