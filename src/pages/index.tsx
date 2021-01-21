/** @jsx jsx */
import { jsx } from 'theme-ui';

export default function HomePage(props) {
  return (
    <p
      {...props}
      sx={{
        fontSize: 0,
        fontFamily: 'body',
        fontWeight: 'body',
      }}
    >
      Welcome to the start of Dobbie!
    </p>
  );
}
