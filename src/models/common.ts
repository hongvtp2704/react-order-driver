import { FunctionComponent } from 'react';

export type Route = {
  path: string;
  Component: FunctionComponent;
  exact: boolean;
};