"use client";

import Error from "@/components/commons/error";
import type { ReactNode } from "react";

export default function Custom404(): ReactNode {
  return <Error errorType="404" isShow />;
}
