/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FunctionComponent } from 'react';

export const Layout: FunctionComponent = ({ children }) => (
  <div css={css({ fontFamily: 'Helvetica', fontWeight: 300 })}>{children}</div>
);
