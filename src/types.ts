export type RoleSelector = {
  waitFor: 'role';
  value: { role: string; attributes?: Record<string, string> };
};

export type SingleValueSelector = {
  waitFor: 'data-hook' | 'text';
  value: string;
};

export type Selector = RoleSelector | SingleValueSelector;

export interface Options {
  visible?: boolean;
  hidden?: boolean;
  timeout?: number;
}

export interface ElementHandle {
  waitForSelector: (
    selector: string,
    options: Options,
  ) => Promise<ElementHandle | null>;
  waitForXPath: (
    xpath: string,
    options: Options,
  ) => Promise<ElementHandle | null>;
  click: () => Promise<void>;
  type: (input: string) => Promise<void>;
  evaluate: (f: any) => Promise<any>;
  screenshot: () => Promise<string | Buffer>;
}

export interface Page {
  waitForSelector: (
    selector: string,
    options: Options,
  ) => Promise<ElementHandle | null>;
  waitForXPath: (
    xpath: string,
    options: Options,
  ) => Promise<ElementHandle | null>;
}
