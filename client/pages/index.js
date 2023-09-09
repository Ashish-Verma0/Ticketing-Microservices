import { getFetch } from "./api/api";

const LandingPage = ({ message }) => {
  return message?.name ? (
    <h1>You are signed In</h1>
  ) : (
    <h1>You are not signed In</h1>
  );
};

LandingPage.getInitialProps = async () => {
  try {
    const response = await getFetch("http://localhost:8080/api/v1/me");

    console.log("I am in landing Pages------------------", response);

    return response;
  } catch (error) {
    console.log(error);
  }
};
export default LandingPage;
