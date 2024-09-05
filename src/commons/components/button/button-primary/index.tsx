import { ButtonBase } from "..";
import { IButtonCommonProps } from "../types";

// primary 테마 - fit 사이즈
export const ButtonPrimaryFit = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="fit" />;
};

// primary 테마 - s 사이즈
export const ButtonPrimaryS = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="s" />;
};
// primary 테마 - m 사이즈
export const ButtonPrimaryM = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="m" />;
};
// primary 테마 - l 사이즈
export const ButtonPrimaryL = ({
  ...rest
}: IButtonCommonProps): JSX.Element => {
  return <ButtonBase {...rest} theme="primary" size="l" />;
};
