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
  speed: 400,
  slidesToShow: 3,
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
const titles = ["Период", "Всего", "Риски"];

// const datesMap = new Map();
// const totalMap = new Map();
// const risksMap = new Map();

let date = store.summaryDates;
let total = store.summaryTotal;
let risks = store.summaryRisks;

// date.forEach((element, index) => {
//   datesMap.set(index, element);
// });

// total.forEach((element, index) => {
//   totalMap.set(index, element);
// });

// risks.forEach((element, index) => {
//   risksMap.set(index, element);
// });

const SimpleSlider = () => {
  return (
    <div>
      <div className="slider-titles">
        {titles.map((title) => (
          <div>
            <p key={title}>{title}</p>
          </div>
        ))}
      </div>
      {store.isLoading ? (
        <div>
          <Loader />
          <p>Загружаем данные</p>
        </div>
      ) : (
        <Slider className="summary-slider" {...settings}>
          {date.map((value, index) => (
            <div className="slider-item" id={index}>
              <div> {date[index]} </div>
              <div> {total[index]} </div>
              <div> {risks[index]} </div>
              {/* <div> {datesMap.get(index)} </div> */}
              {/* <div> {totalMap.get(index)} </div>
              <div> {risksMap.get(index)} </div> */}
            </div>
          ))}
        </Slider>
      )}
    </div>
  );

  //   return (
  //     <div>
  //       <div>
  //         {titles.map((title) => (
  //           <div>
  //             <p key={title}>{title}</p>
  //           </div>
  //         ))}
  //       </div>
  //       <Slider {...settings}>
  //         {date.map((element, index) => (
  //           <div className="slider-item" id={index}>
  //             <p> {datesMap.get(index)} </p>
  //             <p> {totalMap.get(index)} </p>
  //             <p> {risksMap.get(index)} </p>
  //           </div>
  //         ))}
  //       </Slider>
  //     </div>
  //   );
};

export default SimpleSlider;
