import "bootstrap/dist/css/bootstrap.css";
import { getFetch } from "./api/api";
import Header from "../components/header";
const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <Header currentUser={currentUser} />
      <Component {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const response = await getFetch("http://localhost:8080/api/v1/me");
  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(appContext.ctx);
  }
  // console.log(pageProps);

  return {
    pageProps,
    currentUser: response,
  };
};

export default AppComponent;
