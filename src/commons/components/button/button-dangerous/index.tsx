import { ButtonBase } from "..";
import { IButtonCommonProps } from "../types";

// dangerous 테마 - fit 사이즈
export const ButtonDangerousFit = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="dangerous" size="fit" />;
};

// dangerous 테마 - s 사이즈
export const ButtonDangerousS = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="dangerous" size="s" />;
};
// dangerous 테마 - m 사이즈
export const ButtonDangerousM = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="dangerous" size="m" />;
};
// dangerous 테마 - l 사이즈
export const ButtonDangerousL = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="dangerous" size="l" />;
};
