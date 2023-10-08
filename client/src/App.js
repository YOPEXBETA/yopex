import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./Components/ScrollTop";
import Routes from "./routes/index";
import ThemeCustomization from "./themes";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

const App = () => {
  console.log("Process", process.env.REACT_APP_API_ENDPOINT);
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
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <ReactQueryDevtools />
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </QueryClientProvider>
    </ThemeCustomization>
  );
};

export default App;
