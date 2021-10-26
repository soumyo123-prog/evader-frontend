import axios from '../context/axios';

interface eventModifications {
  name: string;
  description: string;
  time: Date;
}

export default function SaveEventSettingsService(
  eventId: string,
  token: string,
  data: eventModifications
) {
  return axios.patch(`event/update/${eventId}/`, data, {
    headers: { Authorization: `Token ${token}` },
  });
}
