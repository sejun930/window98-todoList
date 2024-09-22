import type { ReactNode } from "react";
import DeletedHeader from "@/components/deleted/header";
import DeletedList from "@/components/deleted/list";

export default function DeletedPage(): ReactNode {
  return (
    <>
      <DeletedHeader />
      <DeletedList />
    </>
  );
}
