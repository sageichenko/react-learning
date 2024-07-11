'use client'

// TODO Обсуждали что если будут проблемы с use client, то нужно ставить vite, но я не понял, вроде изначально обсуждали что на next будем пилить
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
