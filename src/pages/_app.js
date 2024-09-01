import { BlogProvider } from "../contexts/BlogContext";

function MyApp({ Component, pageProps }) {
  return (
    <BlogProvider>
      <Component {...pageProps} />
    </BlogProvider>
  );
}

export default MyApp;
