'use client'

import {NewUserForm} from "@/component/user/NewUserForm";
import {EditableList} from "@/component/user/UsersEditForm/EditableList";

export const UsersEditForm = () => {
  console.log('UsersEditForm render');
  return (
    <div>
      <h3>Add new user:</h3>
      <NewUserForm />
      <h3>Users:</h3>
      <EditableList />
    </div>
  );
}
