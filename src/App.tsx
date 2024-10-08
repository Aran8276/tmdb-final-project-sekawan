import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeLists } from "./Routes";
import Layout from "./layout/Layout";
import { ThemeProvider } from "./components/ThemeProvider";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Layout>
          <Routes>
            {routeLists.map((item, index) => {
              return (
                <Route key={index} path={item.href} element={item.element} />
              );
            })}
          </Routes>
        </Layout>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
