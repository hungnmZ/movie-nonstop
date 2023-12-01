'use client';

const GlobalError = ({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => (
  <html>
    <body>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </body>
  </html>
);

export default GlobalError;
