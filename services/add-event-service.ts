import axios from '../context/axios';

export default async function AddEventService(
  name: string,
  description: string,
  venue: string,
  time: string,
  photoUrl: string,
  token: string
) {
  return axios.post<{ id: number }>(
    'event/create/',
    {
      name,
      description,
      venue,
      time,
      photoUrl,
    },
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    }
  );
}
