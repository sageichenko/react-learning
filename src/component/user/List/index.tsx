'use client'

import {Row} from "@/component/user/List/Row";
import {Popup} from "@/component/ui/Popup";
import {useRef, useState} from "react";
import {User, UserData} from "@/types/user";

export const List = ({
  users,
  remove,
  edit
}: Readonly<{
  users: User[];
  remove?: ({id}: {id: string}) => void;
  edit?: ({user, id}: {user: UserData, id: string}) => void;
}>) => {
  console.log('List render');
  const [isRemovePopupOpen, setIsRemovePopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const chosenEditUser = useRef<{id: string; user: UserData} | null>(null);
  const chosenRemoveUserId = useRef<string | null>(null);

  const removeUser = () => {
    if (typeof chosenRemoveUserId.current !== 'string' || !remove) {
      return;
    }

    remove( {
      id: chosenRemoveUserId.current
    })

    setIsRemovePopupOpen(false);
    chosenRemoveUserId.current = null;
  }

  const editUser = () => {
    if (!chosenEditUser.current || !edit) {
      return;
    }

    edit({
      id: chosenEditUser.current.id,
      user: chosenEditUser.current.user
    })
    setIsEditPopupOpen(false);
    chosenEditUser.current = null;
  }

  const handleRemove = (id: string) => {
    chosenRemoveUserId.current = id;

    setIsRemovePopupOpen(true);
  }

  const handleEdit = (id: string, user: UserData) => {
    chosenEditUser.current = {
      id, user
    };

    setIsEditPopupOpen(true);
  }

  return (
    <>
      <ul>
        { users.map((user) => (
          <li key={ user.id }>
            <Row user={ user } onRemove={ remove && handleRemove } onEdit={ edit && handleEdit }/>
          </li>
        )) }
      </ul>
      <Popup id="delete-user" isOpen={ isRemovePopupOpen } onClose={ () => setIsRemovePopupOpen(false) }>
        <p>Are you sure?</p>
        <div>
          <button onClick={ removeUser }>yes</button>
          <button onClick={ () => setIsRemovePopupOpen(false) }>no</button>
        </div>
      </Popup>
      <Popup id="edit-user" isOpen={ isEditPopupOpen } onClose={ () => setIsEditPopupOpen(false) }>
        <p>Are you want update name of user with id { chosenEditUser.current?.id } to "{ chosenEditUser.current?.user.name }"</p>
        <div>
          <button onClick={ editUser }>yes</button>
          <button onClick={ () => setIsEditPopupOpen(false) }>no</button>
        </div>
      </Popup>
    </>
  );
}
