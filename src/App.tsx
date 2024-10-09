import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeLists } from "./Routes";
import Layout from "./layout/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchContext from "./context/Search";
import { useState } from "react";

function App() {
  const [searchString, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ searchString, setSearch }}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
              <Routes>
                {routeLists.map((item, index) => {
                  return (
                    <Route
                      key={index}
                      path={item.href}
                      element={item.element}
                    />
                  );
                })}
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </SearchContext.Provider>
  );
}

export default App;
