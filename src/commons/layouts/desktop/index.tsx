import styles from "./styles.module.css";
import { DESKTOP_LISTS } from "./constants";
import type { IWithLinkProps } from "./types";

import Image from "next/image";
import Link from "next/link";

// 레이아웃의 왼쪽 영역 아이콘들
export default function LayoutsDesktop() {
  // 이동 경로가 있을 경우, Link 태그와 함께 사용
  const withLink = ({ children, href, isBlank }: IWithLinkProps) => {
    if (href)
      return (
        <Link href={href} target={isBlank ? "_blank" : "_self"}>
          {children}
        </Link>
      );

    return children;
  };

  return (
    <article className={styles.wrapper}>
      {DESKTOP_LISTS?.map(({ name, src, href, isBlank }) => {
        return (
          <div key={`desktop-${name}-${src}`} className={styles.app}>
            {withLink({
              children: (
                <div className={styles.item}>
                  <div className={styles.image}>
                    <Image src={`/icons/${src}.png`} alt={name} layout="fill" />
                  </div>

                  <p>{name}</p>
                </div>
              ),
              href,
              isBlank,
            })}
          </div>
        );
      })}
    </article>
  );
}
