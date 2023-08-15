import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ScrollTop from "./Components/ScrollTop";
import Routes from "./routes/index";
import ThemeCustomization from "./themes";

const queryClient = new QueryClient();

const App = () => {
  return (
    <ThemeCustomization>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ScrollTop>
          <Routes />
        </ScrollTop>
      </QueryClientProvider>
    </ThemeCustomization>
  );
};

export default App;
