"use client";

import { useEffect } from "react";
import styles from "./styles.module.css";
import { INIT_TODO_LIST } from "@/commons/init/todo-list";

import { ButtonDangerousL, ButtonPrimaryL } from "@/commons/components/button";
import { TextBody02 } from "@/commons/components/text";
import { useFormContext } from "react-hook-form";
import { ICommonsTodoListsWriteProps } from "./types";
import { IZodSchemaTodoListsWrite } from "@/commons/zod/todo-list.zod";
import { useUtillDialog } from "@/commons/utills/dialog";

import {
  useServerUtillsTodoListsCreate,
  useServerUtillsTodoListsUpdate,
} from "@/server/utills/todo-lists";
import { useRouter } from "next/navigation";
import { useUtillDialogAlert } from "@/commons/utills";

// 리스트 등록 & 수정 컴포넌트
export default function CommonsTodoListsWrite({
  isEdit,
  info = { ...INIT_TODO_LIST },
  useBackEvent,
  afterMovePath,
}: ICommonsTodoListsWriteProps) {
  const { id } = info;
  const router = useRouter();
  const { openDialogAlert, closeDialogAlert } = useUtillDialogAlert();

  const { register, formState, handleSubmit, setValue } =
    useFormContext<IZodSchemaTodoListsWrite>();
  // 등록 가능 여부
  const { isValid } = formState;

  // 콜백 함수
  const callback = () => {
    // 등록 & 수정창 닫기
    closeDialog();
    closeDialogAlert();

    // 종료 후 이동할 경로가 설정되어 있다면
    if (afterMovePath) router.replace(afterMovePath);
  };

  // 등록 관련 함수
  const { createTodoListMutation } = useServerUtillsTodoListsCreate({
    callback,
  });
  // 수정 관련 함수
  const { updateTodoListMutation } = useServerUtillsTodoListsUpdate({
    callback,
  });

  useEffect(() => {
    // 수정 모드일 경우 조회한 데이터를 초기 데이터로 삽입
    if (isEdit) {
      setValue("title", info.title);
      setValue("contents", info.contents);
    }
  }, [isEdit]);

  // dialog 종료
  const { closeDialog } = useUtillDialog();

  // 등록 & 수정 실행
  const writeTodoList = handleSubmit(async (data) => {
    const { title, contents } = data;
    if (!title || !contents) return;

    try {
      const waitText = `리스트 ${isEdit ? "수정" : "등록"} 중`;
      openDialogAlert({
        onlyWait: true,
        dialogAlertInfo: {
          text: `${waitText} 입니다.`,
        },
        headerInfo: {
          title: waitText,
        },
      });

      if (isEdit) {
        // todo-list 수정
        updateTodoListMutation.mutate({ data, id });
      } else {
        // todo-list 등록
        createTodoListMutation.mutate(data);
      }

      return;
    } catch (err) {
      if (err instanceof Error) throw new Error(err?.message);
    }
  });

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} onSubmit={writeTodoList}>
        <div className={styles.write__wrapper}>
          <input
            placeholder="제목 입력"
            className={styles.title}
            {...register("title")}
            id="title"
            maxLength={20}
          />
          <textarea
            placeholder="내용 입력"
            className={styles.contents}
            {...register("contents")}
            id="contents"
            maxLength={200}
          ></textarea>
        </div>

        <div className={styles.button__wrapper}>
          {useBackEvent && (
            <ButtonDangerousL onClick={useBackEvent}>
              <TextBody02>취소</TextBody02>
            </ButtonDangerousL>
          )}

          <ButtonPrimaryL
            disable={!isValid}
            active={isValid}
            onClick={writeTodoList}
          >
            <TextBody02>{isEdit ? "수정" : "등록"}</TextBody02>
          </ButtonPrimaryL>
        </div>
      </form>
    </div>
  );
}
