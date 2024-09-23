import { HeaderProvider } from "../contexts/HeaderContext";
import { HomePageProvider } from "../contexts/HomePageContext";
import "../app/globals.css";

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
