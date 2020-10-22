import React from "react";
import SliderSlick from "react-slick";

const Slider = () => {
  return (
    <div id="slide" className="carousel slide" data-ride="carousel">
      <SliderSlick>
        <div className="carousel-item active">
          <img src="images/slide-1.png" alt="Vietpro Academy" />
        </div>
        <div className="carousel-item">
          <img src="images/slide-2.png" alt="Vietpro Academy" />
        </div>
        <div className="carousel-item">
          <img src="images/slide-3.png" alt="Vietpro Academy" />
        </div>
        <div className="carousel-item">
          <img src="images/slide-4.png" alt="Vietpro Academy" />
        </div>
        <div className="carousel-item">
          <img src="images/slide-5.png" alt="Vietpro Academy" />
        </div>
        <div className="carousel-item">
          <img src="images/slide-6.png" alt="Vietpro Academy" />
        </div>
      </SliderSlick>
    </div>
  );
};

export default Slider;
