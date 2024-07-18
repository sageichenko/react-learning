import {List} from "@/component/user/List";
import {NewUserForm} from "@/component/user/NewUserForm";

export const UsersEditForm = () => {
  console.log('UsersEditForm render');
  return (
    <div>
      <h3>Add new user:</h3>
      <NewUserForm />
      <h3>Users:</h3>
      <List />
    </div>
  );
}
