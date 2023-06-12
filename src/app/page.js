import styles from "./page.module.css";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  router.push("/library")
  return <div></div>;
}
