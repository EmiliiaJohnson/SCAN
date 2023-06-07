import React from "react";
import { Link } from 'react-router-dom';
import './main.css';
import service from '../../assets/images/service.svg';
import SimpleSlider from "./Slider/slider";
import Tariff from "./Tariffs/tariff";

function Main() {

    return (
<div className="main">
    <section className="search-service">
        <div>
            <h1 className="search-service__title">
                сервис по поиску публикаций <br />
                о компании <br />
                по его ИНН <br />
            </h1>
            <div className="search-service__mobile">
                <p className="search-service__info">
                    Комплексный анализ публикаций, получение данных в формате PDF на электронную почту.
                </p>
                <button className="search-service__request-button">
                    <Link to= "/search">Запросить данные</Link>
                </button>
            </div>
        </div>
        <div className="search-service__img">
            <img src= { service } alt="main page" />
        </div>
    </section>
    <section className="why-we">
        <h2 className="h2__title">Почему именно мы</h2>
        <div> <SimpleSlider /></div>
        <div className="why-we__img"></div>
    </section>
    <section>
    <h2 className="h2__title">наши тарифы</h2>
        <Tariff />
    </section>
</div>
    )
}

export default Main;