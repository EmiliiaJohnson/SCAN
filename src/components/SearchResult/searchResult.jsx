import React, { useEffect } from "react";
import "./searchResult.css";
import store from "../../store/store";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";
import SimpleSlider from "./SummarySlider/summarySlider";
import { Link } from "react-router-dom";

const SearchResult = observer(() => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!store.token) {
      navigate("/auth");
    }
  });

  return (
    <div className="search-result">
      {store.isLoading ? (
        <div>
          <h1 className="search-title">Ищем. Скоро будут результаты</h1>
          <p className="search-details">
            Поиск может занять некоторое время, <br /> просим сохранять
            терпение.
          </p>
        </div>
      ) : (
        <h1 className="search-title">Результаты поиска</h1>
      )}
      {store.isSummaryError ? (
        <div>
          Что-то пошло не так :( Попробуйте
          <Link to="/search"> изменить параметры поиска</Link>
        </div>
      ) : (
        <SimpleSlider />
      )}
    </div>
  );
});

export default SearchResult;
