import styles from "./page.module.css";
import {UsersEditForm} from "@/component/user/UsersEditForm";
import {Provider as UserProvider} from "@/provider/Users";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>React practice</h1>
      <UserProvider>
        <UsersEditForm />
      </UserProvider>
    </main>
  );
}
