import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import "./tariff.css";
import beginner from "../../../assets/images/beginner.svg";
import pro from "../../../assets/images/pro.svg";
import business from "../../../assets/images/business.svg";
import checkpoint from "../../../assets/images/checkpoint.svg";
import store from "../../../store/store";

const Tariff = observer(() => {
  useEffect(() => {
    store.checkToken();
  }, []);

  const tariff = [
    {
      styleObj: {
        background: "var(--main-color-yellow)",
      },
      id: 1,
      title: "Beginner",
      image: beginner,
      description: "Для небольшого исследования",
      price: "1 200 ₽",
      discount: "799 ₽",
      loan: "или 150 ₽/мес. при рассрочке на 24 мес.",
      details: {
        detail1: "Безлимитная история запросов",
        detail2: "Безопасная сделка",
        detail3: "Поддержка 24/7",
      },
    },
    {
      styleObj: {
        background: "var(--main-color-light-green)",
      },
      id: 2,
      title: "Pro",
      image: pro,
      description: "Для HR и фрилансеров",
      price: "2 600 ₽",
      discount: "1 299 ₽",
      loan: "или 279 ₽/мес. при рассрочке на 24 мес.",
      details: {
        detail1: "Все пункты тарифа Beginner",
        detail2: "Экспорт истории",
        detail3: "Рекомендации по приоритетам",
      },
    },
    {
      styleObj: {
        background: "#000",
        color: "#fff",
      },
      id: 3,
      title: "Business",
      image: business,
      description: "Для корпоративных клиентов",
      price: "3 700 ₽",
      discount: "2 379 ₽",
      loan: "",
      details: {
        detail1: "Все пункты тарифа Pro",
        detail2: "Безлимитное количество запросов",
        detail3: "Приоритетная поддержка",
      },
    },
  ];

  let res = tariff.map(function (item) {
    return (
      <div className="tariff" key={item.id}>
        <div className="tariff-header" style={item.styleObj}>
          <div className="tariff-header__info">
            <h3 className="tariff-title">{item.title}</h3>
            <p className="tariff-description">{item.description}</p>
          </div>
          <img alt="" src={item.image} />
        </div>
        <div
          className={
            store.token && item.id === 1
              ? "tariff-body tariff-body__current"
              : "tariff-body"
          }
        >
          <span
            className={
              store.token && item.id === 1 ? "current" : "current-disabled"
            }
          >
            Текущий тариф
          </span>
          <div className="tariff-price__container">
            <p className="tariff-price">{item.price}</p>
            <p className="tariff-price tariff-price__discount">
              {item.discount}
            </p>
          </div>
          <p className="tariff-info tariff-info__loan">{item.loan}</p>
          <p className="tariff-info tariff-info__title">В тариф входит:</p>
          <li className="tariff-info">
            <img className="tariff-info__check" src={checkpoint} alt="" />
            {item.details.detail1}
          </li>
          <li className="tariff-info">
            <img className="tariff-info__check" src={checkpoint} alt="" />
            {item.details.detail2}
          </li>
          <li className="tariff-info">
            <img className="tariff-info__check" src={checkpoint} alt="" />
            {item.details.detail3}
          </li>
          <button
            className={
              store.token && item.id === 1
                ? "tariff-button tariff-button__current"
                : "tariff-button"
            }
          >
            <Link to="/error">
              {store.token && item.id === 1
                ? "Перейти в личный кабинет"
                : "Подробнее"}
            </Link>
          </button>
        </div>
      </div>
    );
  });

  return <div className="tariffs">{res}</div>;
});

export default Tariff;
