import React, { useEffect } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import scan from "../../assets/images/scan-logo-header.svg";
import Signed from "./Signed/signed";
import NotSigned from "./NotSigned/notSigned";
import BurgerMenu from "./BurgerMenu/burger";
import store from "../../store/store";

const Header = observer(() => {
  useEffect(() => {
    store.checkToken();
  }, []);

  return (
    <header className="header">
      <Link to="/">
        <img className="header-logo" src={scan} alt="logo" />
      </Link>
      <nav className="header-nav">
        <Link className="header-nav__link" to="/">
          Главная
        </Link>
        <a className="header-nav__link" href="#tariffs">
          Тарифы
        </a>
        <Link className="header-nav__link" to="/error">
          FAQ
        </Link>
      </nav>
      {store.token ? <Signed /> : <NotSigned />}
      <BurgerMenu />
    </header>
  );
});

export default Header;
