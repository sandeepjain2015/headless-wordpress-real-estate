"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";

type HeroSlide = {
  sourceUrl: string;
  altText?: string;
};

export default function HeroSlider({
  slides,
}: {
  slides: HeroSlide[];
}) {
  return (
    <div className="hero">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 4000 }}
        loop
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="hero-slide-item position-relative">
  <Image
    src={slide.sourceUrl}
    alt={slide.altText || "Hero"}
    fill
    priority={index === 0}
    sizes="100vw"
    quality={75}
    style={{
      objectFit: "cover",
    }}
  />

  <div className="overlay"></div>
</div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}