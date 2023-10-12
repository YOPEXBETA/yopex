import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./Components/ScrollTop";
import Routes from "./routes/index";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => {
  //console.log("Process", process.env.REACT_APP_API_ENDPOINT);
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("token")) {
      // Extract the access code from the URL
      const accessToken = queryParams.get("token");
      localStorage.setItem("accessToken", accessToken);
      // Remove the access code from the URL
      window.history.replaceState({}, document.title, "/");
    }
  }, []);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        {/*<ReactQueryDevtools />*/}
        <Helmet>
          <title>YOPEX</title>
          <meta
            name="description"
            content="yopex is a social media platform for startups where freelancers and startups can connect, yopex is also the hub for job opportunities"
          />
          <meta
            name="keywords"
            content="Freelance, YOPEX, Startups, freelancers, Social Media, Internships, Job Opportunities"
          />
        </Helmet>

        <ScrollTop>
          <Routes />
        </ScrollTop>
      </QueryClientProvider>
    </>
  );
};

export default App;
