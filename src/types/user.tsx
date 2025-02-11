export interface UserData {
  name: string;
}

export interface User extends UserData {
  id: string;
}

export type UserAction = {
  type: 'add';
  payload: UserData;
} | {
  type: 'remove';
  payload: string
} | {
  type: 'edit';
  payload: {
    id: string;
    user: UserData
  }
}
