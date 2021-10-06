export type userProfileType = {
  name: string;
  email: string;
  uid: string;
};

export type EventType = {
  description: string;
  id: number;
  name: string;
  fireId: string;
  time: string;
  venue: string;
  status: number | undefined;
  invitedBy: string | undefined;
};

export type GuestType = {
  status: number;
  name: string;
  email: string;
};
