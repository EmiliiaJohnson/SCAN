import "./App.css";
import Header from "./components/Header/header";
import Main from "./components/Main/main";
import Footer from "./components/Footer/footer";
import Error from "./components/Error-page/error";
import Authorization from "./components/Authorization/auth";
import Search from "./components/Search/search";
import SearchResult from "./components/SearchResult/searchResult";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="*" element={<Main />} />
          <Route path="/error" element={<Error />} />
          <Route path="/auth" element={<Authorization />} />
          <Route path="/search" element={<Search />} />
          <Route path="/result" element={<SearchResult />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
