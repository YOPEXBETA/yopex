import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./Components/ScrollTop";
import Routes from "./routes/index";
import ThemeCustomization from "./themes";

const queryClient = new QueryClient();
const queryParams = new URLSearchParams(window.location.search);
if (queryParams.has("code")) {
  // Extract the access code from the URL
  const accessToken = queryParams.get("token");
  localStorage.setItem("accessToken", accessToken);
  // Remove the access code from the URL
  window.history.replaceState({}, document.title, "/");
  

}
const App = () => {
  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </QueryClientProvider>
    </ThemeCustomization>
  );
};

export default App;
