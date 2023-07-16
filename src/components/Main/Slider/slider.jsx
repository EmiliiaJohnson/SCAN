import React from "react";
import "./slider.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import time from "../../../assets/images/time.svg";
import search from "../../../assets/images/search.svg";
import safety from "../../../assets/images/safety.svg";
import happy from "../../../assets/images/happy.svg";

export default function SimpleSlider() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 870,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slider = [
    {
      text: "Высокая и оперативная скорость обработки заявки",
      image: time,
    },

    {
      text: "Огромная комплексная база данных, обеспечивающая объективный ответ на запрос",
      image: search,
    },

    {
      text: "Защита конфеденциальных сведений, не подлежащих разглашению по федеральному законодательству",
      image: safety,
    },

    {
      text: "99,99% процентов довольных клиентов, станьте одним из них!",
      image: happy,
    },
  ];

  return (
    <Slider {...settings}>
      {slider.map((card, id) => (
        <div className="slider-item" key={id}>
          <img className="slider-img" alt="" src={card.image} />
          <p className="slider-info">{card.text}</p>
        </div>
      ))}
    </Slider>
  );
}
