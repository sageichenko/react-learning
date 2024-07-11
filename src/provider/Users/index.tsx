import {ReactNode, useContext, useEffect, useReducer} from "react";
import {createContext} from 'react';
import {User, UserAction, UserData} from "@/types/user";

const getId = ({ name }: UserData): string => name.toLowerCase();

const log = (...args: any) => console.log('%c[UserReducer log]:', 'color: orange', ...args,)

export const UserReducer = (users: User[], action: UserAction): User[] => {
  log('users: ', users, 'action: ', action);

  const {
    id,
    user
  } = action.payload;

  switch(action.type) {
    case 'add': {
      if (!user || !user.name) {
        log('User data was not provided, operation - add')

        return users;
      }

      if (users.find(({name}) => name === user?.name)) {
        log(`User with name ${user?.name} is already exist`);

        // TODO Подумать нужно ли возвращать новую ссылку, если по факту ниче не поменялось
        return users;
      }

      log(`User with name ${user?.name} was added`);

      return [
        ...users, {
          ...user,
          id: getId(user)
        }
      ];
    }
    case 'remove': {
      if (!id) {
        log('Id was not provided, operation - remove');

        return users;
      }

      if (users.find(({id: userId}) => userId === id)) {
        log(`User with id ${id} was removed`);

        return users.filter(({id: userId}) => userId !== id);
      }

      log(`User with id ${id} doesnt exist`);

      return users;
    }
    case 'edit': {
      if (!id || !user) {
        log('Id or user data was not provided, operation - edit');

        return users;
      }

      const index = users.findIndex(({id: userId}) => userId === id);

      if (index === -1) {
        log(`User with id ${id} doesnt exist`);

        return users;
      }

      const newUsers = [...users];
      newUsers[index] = {
        id,
        ...user
      }

      log(`User with id ${id} was updated`);

      return newUsers;
    }
    default: {
      return users;
    }
  }
}
export const UsersContext = createContext([] as User[]);
export const UsersActionContext = createContext(() => []);

export const useUsers = () => {
  return useContext(UsersContext);
}

export const useUsersActions = () => {
  const dispatch = useContext(UsersActionContext);

  // TODO: Разобраться почему возникает ошибка TS2554: Expected 0 arguments, but got 1
  return {
    add: ({user}: {user: UserData}) => dispatch({
      type: 'add',
      payload: {
        user
      }
    }),
    remove: ({id}: {id: string}) => dispatch({
      type: 'remove',
      payload: {
        id
      }
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

// TODO По идее useReducer можно использовать только на клиенте, не очень понятно как тогда рисовать подобные компоненте на сервере
export const Provider = ({children}: {children: ReactNode}) => {
  const [users, dispatch] = useReducer(UserReducer, []);

  // TODO Разобраться с TS2322: Type Dispatch<UserAction> is not assignable to type () => never[]
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
