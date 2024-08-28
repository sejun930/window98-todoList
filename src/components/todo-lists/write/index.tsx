import { ButtonPrimaryL } from "@/commons/components/button";
import styles from "./styles.module.css";
import { TextBody02 } from "@/commons/components/text";
import { useFormContext } from "react-hook-form";
import { IZodSchemaTodoListsWrite } from "./types";

// 리스트 등록 & 수정 컴포넌트
export default function TodolistsWrite() {
  const { register, formState, handleSubmit } =
    useFormContext<IZodSchemaTodoListsWrite>();

  // 등록 가능 여부
  const { isValid } = formState;

  // 등록 & 수정 실행
  const writeTodoList = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={writeTodoList}>
        <div className={styles.write__wrapper}>
          <input
            placeholder="제목 입력"
            className={styles.title}
            {...register("title")}
          />
          <textarea
            placeholder="내용 입력"
            className={styles.contents}
            {...register("contents")}
          ></textarea>
        </div>

        <ButtonPrimaryL
          disable={!isValid}
          active={isValid}
          onClick={writeTodoList}
        >
          <TextBody02>등록</TextBody02>
        </ButtonPrimaryL>
      </form>
    </section>
  );
}
