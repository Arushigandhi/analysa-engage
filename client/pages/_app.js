import { useState } from "react";

import "../styles/globals.scss";
import "antd/dist/antd.css";
import { QueryClientProvider, QueryClient } from "react-query";

function MyApp({ Component, pageProps }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default MyApp;
