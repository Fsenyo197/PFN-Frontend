import "../app/globals.css";
import { HeaderProvider } from "../components/HeaderContext";
import { HomePageProvider } from "../components/HomePageContext";

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
