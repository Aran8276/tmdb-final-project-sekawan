import { BrowserRouter, Route, Routes } from "react-router-dom";
import { routeLists } from "./Routes";
import Layout from "./layout/Layout";
import { ThemeProvider } from "./components/ThemeProvider";
import { Provider } from "react-redux";
import store from "./store/store";
import SearchContext from "./context/Search";
import { useState } from "react";
import Genre from "./pages/Genre/Genre";
import NotFound from "./pages/Errors/NotFound";
import MovieDetail from "./pages/Detail/MovieDetail";
import LinkTMDB from "./pages/Auth/LinkTMDB";

function App() {
  const [searchString, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ searchString, setSearch }}>
      <Provider store={store}>
        <BrowserRouter>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <Layout>
              {/*Di generate melalui navbar */}
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
                {/*Generate manual utk yg tidak ada di navbar */}
                <Route path="/link" element={<LinkTMDB />} />
                <Route path="/list/genre/:id" element={<Genre />} />
                <Route path="/movie/:id" element={<MovieDetail />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </BrowserRouter>
      </Provider>
    </SearchContext.Provider>
  );
}

export default App;
