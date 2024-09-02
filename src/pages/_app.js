import { HeaderProvider } from "../contexts/HeaderContext";
import { BlogProvider } from "../contexts/BlogContext";

function MyApp({ Component, pageProps }) {
  return (
    <HeaderProvider>
      <BlogProvider>
        <Component {...pageProps} />
      </BlogProvider>
    </HeaderProvider>
  );
}

export default MyApp;
