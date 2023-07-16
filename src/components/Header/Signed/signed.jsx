import React, { useEffect } from "react";
import "./signed.css";
import { observer } from "mobx-react-lite";
import store from "../../../store/store";
import avatar from "../../../assets/images/user-icon.svg";
import Loader from "../../Loader/loader";
import { Link } from "react-router-dom";

const Signed = observer(() => {
  useEffect(() => {
    store.checkToken();
    store.getCompaniesInfo();
  }, []);
  const login = localStorage.getItem("login");
  return (
    <div className="signed">
      <div className="companies-wrapper">
        {store.isCompaniesLoading ? (
          <Loader />
        ) : (
          <>
            <p className="companies-info">
              Использовано компаний
              <span className="companies-number">
                {store.companiesInfo.used}
              </span>
            </p>
            <p className="companies-info">
              Лимит по компаниям
              <span className="companies-number companies-number__limit">
                {store.companiesInfo.limit}
              </span>
            </p>
          </>
        )}
      </div>
      <div className="user-info">
        <span className="username">{login}</span>
        <button
          className="logout"
          onClick={() => {
            store.setToken("");
            localStorage.clear();
          }}
        >
          <Link className="header-nav__link" to="/">
            Выйти
          </Link>
        </button>
      </div>
      <img className="user-avatar" src={avatar} alt="user avatar" />
    </div>
  );
});

export default Signed;
