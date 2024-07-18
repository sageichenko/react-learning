import {useUsersActions} from "@/provider/Users";
import {FormEvent, useState} from "react";
import {UserData} from "@/types/user";


const initialUser: UserData = {
  name: ''
};
export const NewUserForm = () => {
  console.log('NewUserForm render');
  const { add } = useUsersActions();
  const [user, setUser] = useState<UserData>(initialUser);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!user.name) {
      return;
    }

    add({
      user: {...user}
    });
    setUser(initialUser);
  }

  return (
    <form onSubmit={ handleSubmit }>
      <input
        value={user.name}
        type="text"
        onChange={ (event: FormEvent<HTMLInputElement>) => setUser({
          name: event.currentTarget.value.trim()
        }) }
      />
      <button disabled={!user.name}>add</button>
    </form>
  );
}
