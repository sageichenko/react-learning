import {List} from "@/component/user/List";
import {useUsers, useUsersActions} from "@/provider/Users";
import {useFetch} from "@/hook/useFetch";
import {User} from "@/types/user";
import {useEffect, useRef} from "react";

export const EditableList = () => {
  console.log('EditableList render');
  const users = useUsers();
  const { remove, edit, init } = useUsersActions();
  const fetcher = useRef({method: 'GET'});

  const {
    data,
    error,
    isLoading,
    refetch
  } = useFetch<{users: User[]}>(
    '/mock/users.json',
    fetcher.current
  );

  useEffect(() => {
    if (data) {
      init(data);
    }
  }, [data]);

  if (isLoading) {
    return <p>...Loading</p>
  }

  if (error) {
    return <p>{ error.message }</p>
  }

  return (
    <div>
      <button onClick={ refetch }>reload</button>
      <List users={ users } remove={ remove } edit={ edit }/>
    </div>
  );
}
