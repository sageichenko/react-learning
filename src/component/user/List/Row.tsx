import {User, UserData} from "@/types/user";
import {useUsersActions} from "@/provider/Users";
import {FormEvent, useState} from "react";

export const Row = ({user}: {user: User}) => {
  const {
    id,
    name
  } = user;

  console.log('Row render', name);

  const [newUser, setNewUser] = useState<UserData>({name});
  const { remove, edit } = useUsersActions();

  return (
    <div>
      <input
        value={ newUser.name }
        type="text"
        onInput={(event: FormEvent<HTMLInputElement>) => setNewUser({name: event.currentTarget.value.trim()})}
      />
      <button
        disabled={ newUser.name === name }
        onClick={ () => edit({
          id: id,
          user: {
            name: newUser.name,
          }
        }) }
      >
        edit
      </button>
      <button onClick={ () => remove( {
        id: id
      }) }
      >
        remove
      </button>
    </div>
  );
}
