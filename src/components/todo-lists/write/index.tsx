import { ButtonPrimaryL } from "@/commons/components/button";
import styles from "./styles.module.css";
import { TextBody02 } from "@/commons/components/text";

// 리스트 등록/수정 컴포넌트
export default function TodolistsWrite() {
  return (
    <section className={styles.section}>
      <div className={styles.write__wrapper}>
        <input placeholder="제목 입력" className={styles.title} />
        <textarea
          placeholder="내용 입력"
          className={styles.contents}
        ></textarea>
      </div>

      <ButtonPrimaryL disable>
        <TextBody02>등록</TextBody02>
      </ButtonPrimaryL>
    </section>
  );
}
