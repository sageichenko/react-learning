import {List} from "@/component/user/List";
import {useUsers} from "@/provider/Users";
import {NewUserForm} from "@/component/user/NewUserForm";

export const UsersEditForm = () => {
  console.log('UsersEditForm render');
  const users = useUsers();

  return (
    <div>
      <h3>Add new user:</h3>
      <NewUserForm />
      <h3>Users:</h3>
      <List users={ users } />
    </div>
  );
}
