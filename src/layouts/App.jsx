import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "../context/Theme";
import Layout from "./Layout";

const App = () => {
  return (
    <>
      <ThemeProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
