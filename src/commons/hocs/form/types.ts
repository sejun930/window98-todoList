import type { ZodSchema } from "zod";

export interface IWithFormProps<V> {
  children: JSX.Element;
  zodSchema?: ZodSchema<V>;
}
