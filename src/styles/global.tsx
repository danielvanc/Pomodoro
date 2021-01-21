import React from 'react';
import { Global, css } from '@emotion/react';

export default function GlobalStyles() {
  return (
    <Global
      styles={css`
        @import url('https://fonts.googleapis.com/css2?family=Modak&display=swap');
      `}
    />
  );
}
