import React from 'react';
import styled from '@emotion/styled';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <p>Hello</p>
    </ThemeProvider>
  );
}
