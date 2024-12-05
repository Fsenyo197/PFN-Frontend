import "../app/globals.css";
import { HeaderProvider } from "../contexts/HeaderContext";
import { HomePageProvider } from "../contexts/HomePageContext";
import { FirmsProvider } from "../contexts/FirmsProvider";

function MyApp({ Component, pageProps }) {
  const useFirmsProvider = Component.useFirmsProvider || false;

  const WrappedComponent = useFirmsProvider ? (
    <FirmsProvider>
      <Component {...pageProps} />
    </FirmsProvider>
  ) : (
    <Component {...pageProps} />
  );

  return (
    <HeaderProvider>
      <HomePageProvider>{WrappedComponent}</HomePageProvider>
    </HeaderProvider>
  );
}

export default MyApp;
