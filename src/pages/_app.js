import { HeaderProvider } from "../contexts/HeaderContext";
import { HomePageProvider } from "../contexts/HomePageContext";

function MyApp({ Component, pageProps }) {
  return (
    <HeaderProvider>
      <HomePageProvider>
        <div
          style={{
            width: "100%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Component {...pageProps} />
        </div>
      </HomePageProvider>
    </HeaderProvider>
  );
}

export default MyApp;
