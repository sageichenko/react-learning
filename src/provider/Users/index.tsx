'use client'

import {Dispatch, ReactNode, useContext, useEffect, useReducer} from "react";
import {createContext} from 'react';
import {User, UserAction, UserData} from "@/types/user";

const getId = ({ name }: UserData): string => name.toLowerCase();

const log = (...args: any) => console.log('%c[UserReducer log]:', 'color: orange', ...args,)

export const UserReducer = (users: User[], action: UserAction): User[] => {
  log('users: ', users, 'action: ', action);

  switch(action.type) {
    case 'add': {
      if (!action.payload || !action.payload.name) {
        log('User data was not provided, operation - add')

        return users;
      }

      if (users.find(({name}) => name === action.payload?.name)) {
        log(`User with name ${action.payload?.name} is already exist`);

        return users;
      }

      log(`User with name ${action.payload?.name} was added`);

      return [
        ...users, {
          ...action.payload,
          id: getId(action.payload)
        }
      ];
    }
    case 'remove': {
      if (!action.payload) {
        log('Id was not provided, operation - remove');

        return users;
      }

      if (users.find(({id: userId}) => userId === action.payload)) {
        log(`User with id ${action.payload} was removed`);

        return users.filter(({id: userId}) => userId !== action.payload);
      }

      log(`User with id ${action.payload} doesnt exist`);

      return users;
    }
    case 'edit': {
      if (!action.payload.id || !action.payload.user) {
        log('Id or user data was not provided, operation - edit');

        return users;
      }

      const index = users.findIndex(({id: userId}) => userId === action.payload.id);

      if (index === -1) {
        log(`User with id ${action.payload.id} doesnt exist`);

        return users;
      }

      const newUsers = [...users];
      newUsers[index] = {
        id: action.payload.id,
        ...action.payload.user
      }

      log(`User with id ${action.payload.id} was updated`);

      return newUsers;
    }
    default: {
      return users;
    }
  }
}
export const UsersContext = createContext<User[]>([]);
export const UsersActionContext = createContext<Dispatch<UserAction>>(() => []);

export const useUsers = () => {
  return useContext(UsersContext);
}

export const useUsersActions = () => {
  const dispatch = useContext(UsersActionContext);

  return {
    add: ({user}: {user: UserData}) => dispatch({
      type: 'add',
      payload: user
    }),
    remove: ({id}: {id: string}) => dispatch({
      type: 'remove',
      payload: id
    }),
    edit: ({user, id}: {user: UserData, id: string}) => dispatch({
      type: 'edit',
      payload: {
        id,
        user
      }
    }),
  }
}

export const Provider = ({children}: {children: ReactNode}) => {
  const [users, dispatch] = useReducer<(users: User[], action: UserAction) => User[]>(UserReducer, []);

  useEffect(() => {
    console.log('users', users);
  }, [users]);
  return (
    <UsersContext.Provider value={ users }>
      <UsersActionContext.Provider value={ dispatch }>
        {children}
      </UsersActionContext.Provider>
    </UsersContext.Provider>
  )
}
