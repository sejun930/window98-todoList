import { ButtonPrimaryL } from "@/commons/components/button";
import styles from "./styles.module.css";
import { TextBody02 } from "@/commons/components/text";
import { useFormContext } from "react-hook-form";
import { ITodolistsWriteProps, IZodSchemaTodoListsWrite } from "./types";
import { useUtillDialog } from "@/commons/utills/dialog";

import { useTodolistsWriteCreate } from "./create/hook";

// 리스트 등록 & 수정 컴포넌트
export default function TodolistsWrite({ isEdit }: ITodolistsWriteProps) {
  const { register, formState, handleSubmit } =
    useFormContext<IZodSchemaTodoListsWrite>();
  // 등록 가능 여부
  const { isValid } = formState;

  // 등록 관련 함수
  const { createTodoListMutation } = useTodolistsWriteCreate();
  // dialog 종료
  const { closeDialog } = useUtillDialog();

  // 등록 & 수정 실행
  const writeTodoList = handleSubmit(async (data) => {
    const { title, contents } = data;
    if (!title || !contents) return;

    try {
      if (isEdit) {
      } else {
        // todo-list 등록
        createTodoListMutation.mutate(data);
      }

      // 등록 & 수정창 닫기
      closeDialog();
    } catch (err) {
      if (err instanceof Error) throw new Error(err?.message);
    }
  });

  return (
    <section className={styles.section}>
      <form className={styles.form} onSubmit={writeTodoList}>
        <div className={styles.write__wrapper}>
          <input
            placeholder="제목 입력"
            className={styles.title}
            {...register("title")}
            id="write-title"
            maxLength={20}
          />
          <textarea
            placeholder="내용 입력"
            className={styles.contents}
            {...register("contents")}
            id="write-contents"
            maxLength={200}
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
