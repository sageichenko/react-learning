import {Row} from "@/component/user/List/Row";
import {useUsers} from "@/provider/Users";

export const List= () => {
  console.log('List render');
  const users = useUsers();
  return (
    <ul>
      { users.map((user) => (
        <li key={ user.id }>
          <Row user={ user }/>
        </li>
      )) }
    </ul>
  );
}
