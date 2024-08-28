import { FieldValues, FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IWithFormProps } from "./types";

// form을 사용해야 하는 페이지에서 사용 가능
export default function WithForm<V extends FieldValues>({
  children,
  zodSchema,
}: IWithFormProps<V>) {
  const methods = useForm({
    resolver: zodResolver(zodSchema ?? z.object({})),
    mode: "onChange",
  });

  return <FormProvider {...methods}>{children}</FormProvider>;
}
