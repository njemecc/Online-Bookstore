'use client'
import styles from "./page.module.css";

import { useRouter } from "nex/navigation";

export default function Home() {
  const router = useRouter();
  router.push("/library")
  return <div></div>;
}
