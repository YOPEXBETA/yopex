import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./Components/ScrollTop";
import Routes from "./routes/index";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.has("token")) {
      const accessToken = queryParams.get("token");
      localStorage.setItem("accessToken", accessToken);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
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
