"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/autoplay";

import { Autoplay } from "swiper/modules";

export default function HeroSlider({ slides }: { slides: any[] }) {
  return (
    <div className="hero">
        <div className="hero-slide">
    <Swiper
      modules={[Autoplay]}
      autoplay={{
        delay: 4000,
      }}
      loop={true}
      slidesPerView={1}
    >
      {slides.map((slide, index) => (

        <SwiperSlide key={index}>
          <div
            className="img overlay"
            style={{
              backgroundImage: `url(${slide.sourceUrl})`,
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </div>
  );
}