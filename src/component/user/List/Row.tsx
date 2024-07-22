import {User, UserData} from "@/types/user";
import {FormEvent, useEffect, useState} from "react";

export const Row = ({
  user,
  onRemove,
  onEdit,
}: Readonly<{
  user: User,
  onRemove?: (id: string) => void;
  onEdit?: (id: string, user: UserData) => void
}>) => {
  const {
    id,
    name
  } = user;

  console.log('Row render', name);

  const [newUser, setNewUser] = useState<UserData>({name});

  useEffect(() => {
    setNewUser(user)
  }, [user]);

  return (
    <div>
      <input
        value={ newUser.name }
        type="text"
        onInput={(event: FormEvent<HTMLInputElement>) => setNewUser({name: event.currentTarget.value.trim()})}
      />
      { Boolean(onEdit) && (
          <button
            disabled={ newUser.name === name }
            onClick={ () => onEdit && onEdit(id, newUser) }
          >
            edit
          </button>
      ) }
      { Boolean(onRemove) && (
        <button onClick={ () => onRemove && onRemove(id) }
        >
          remove
        </button>
      ) }
    </div>
  );
}
