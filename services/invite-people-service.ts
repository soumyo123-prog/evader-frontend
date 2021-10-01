import axios from '../context/axios';

export default function invitePeople(id: string, email: string, token: string) {
  return axios.post(
    `event/invite/${id}/`,
    { email },
    { headers: { Authorization: `Token ${token}` } }
  );
}
