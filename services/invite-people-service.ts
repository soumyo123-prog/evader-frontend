import axios from '../context/axios';

export default async function invitePeople(
  id: string,
  email: string,
  token: string
) {
  return axios.post<{ id: number; status: number }>(
    `event/invite/${id}/`,
    { email },
    { headers: { Authorization: `Token ${token}` } }
  );
}
