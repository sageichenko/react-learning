export interface UserData {
  name: string;
}

export interface User extends UserData {
  id: string;
}

export interface UserAction {
  type: string,
  payload: {
    user?: UserData,
    id?: string;
  }
}
