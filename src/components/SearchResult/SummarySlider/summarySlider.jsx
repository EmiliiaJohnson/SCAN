import React from "react";
import "./summarySlider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import store from "../../../store/store";
import Loader from "../../Loader/loader";

let settings = {
  dots: false,
  infinite: false,
  slidesToShow: 8,
  slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1200,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 2,
      },
    },

    {
      breakpoint: 940,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 2,
      },
    },

    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const SimpleSlider = () => {
  let date = store.summaryResult.data.data[0].data.map((item) =>
    item.date
      .substring(0, 10)
      .split("-")
      .join(".")
      .split(".")
      .reverse()
      .join(".")
  );
  let total = store.summaryResult.data.data[0].data.map((item) => item.value);
  let risks = store.summaryResult.data.data[1].data.map((item) => item.value);

  store.setSummaryDates(date);
  store.setSummaryTotal(total);
  store.setSummaryRisks(risks);
  store.setSummaryAll(
    store.summaryTotal.reduce((a, b) => {
      return a + b;
    }) +
      store.summaryRisks.reduce((a, b) => {
        return a + b;
      })
  );

  return (
    <div>
      {store.isSummaryLoading === true ? (
        <div className="slider-loader">
          <Loader />
          <p className="loading-data">Загружаем данные</p>
        </div>
      ) : (
        <>
          <h3 className="summary-title">Общая сводка</h3>
          <p className="summary-all">Найдено {store.summaryAll} вариантов</p>
          <div className="slider-wrapper">
            <div className="slider-titles">
              <p>Период</p>
              <p>Всего</p>
              <p>Риски</p>
            </div>
            <Slider className="summary-slider" {...settings}>
              {date &&
                date.map((el, index) => (
                  <div className="slider-item" id={index}>
                    <p> {store.summaryDates[index]} </p>
                    <p> {store.summaryTotal[index]} </p>
                    <p> {store.summaryRisks[index]} </p>
                  </div>
                ))}
            </Slider>
          </div>
        </>
      )}
    </div>
  );
};

export default SimpleSlider;
