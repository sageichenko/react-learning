import {User} from "@/types/user";
import {Row} from "@/component/user/List/Row";

export const List= ({users}: {users: User[]}) => {
  console.log('List render');
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
