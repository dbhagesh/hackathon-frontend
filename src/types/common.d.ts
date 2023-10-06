/**
 * extending Window to access additional variables
 * binded with window scope
 */

declare global {
  interface Window {
    logger: any;
    pageName: string;
    app: any;
    startTimeSpanForm: Date;
  }
}

export type TPair<T, U = T> = [T, U];

export type TAnyOrNone<T> = {
  [P in keyof T]?: T[P];
};

export enum AlertType {
  error = "error",
  success = "success",
  warning = "warning",
  dark = "dark",
}

export type TQueryParams = { [key: string]: string };
export type TParamsObject = { [key: string]: any };
export type TSimpleMap = { [key: string]: boolean };

export type TEasilyHashable = number | string;

export type TPageName = "error" | "home" | any;

export type TShortPageName = "error" | "home" | any;

export type TRoute = {
  path: string;
  component: ReactNode;
  pageName: TPageName;
  shortPageName?: TShortPageName;
  exact?: true;
};

export type TResizablePanelStatus = "open" | "close";
