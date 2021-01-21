/** @jsx jsx */
import { jsx, ThemeProvider } from 'theme-ui';
import theme from '../theme';
import GlobalStyles from '../styles/global';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
