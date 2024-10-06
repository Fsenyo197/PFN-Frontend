import "../app/globals.css";
import { HeaderProvider } from "../contexts/HeaderContext";
import { HomePageProvider } from "../contexts/HomePageContext";

function MyApp({ Component, pageProps }) {
  return (
    <HeaderProvider>
      <HomePageProvider>
        <Component {...pageProps} />
      </HomePageProvider>
    </HeaderProvider>
  );
}

export default MyApp;
