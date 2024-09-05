export type IAction = (() => void | Promise<void>) | { href: string };

export interface IWithActionProps {
  action: IAction;
  children: React.ReactNode;
}
