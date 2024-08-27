// import Link from "next/link";
import Link from "next/link";
import styles from "./styles.module.css";
import Image from "next/image";

// 레이아웃의 하단 영역
export default function StartBar() {
  return (
    <footer className={styles.footer}>
      <div className={styles.start}>
        <Image src="/icons/window.webp" alt="start" width={0} height={0} />
        <b>시작</b>
      </div>

      <div className={styles.items}>
        <div></div>
        <div className={styles.made}>
          Made By {""}
          <Link href="https://github.com/sejun930" target="_blank">
            sejun930
          </Link>
        </div>
      </div>
    </footer>
  );
}
