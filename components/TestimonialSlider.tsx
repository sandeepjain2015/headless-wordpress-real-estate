"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import TestimonialCard from "./TestimonialCard";
import type { Testimonial } from "@/types/testimonial";

type TestimonialSliderProps = {
  testimonials: Testimonial[];
};

export default function TestimonialSlider({
  testimonials,
}: TestimonialSliderProps) {
  return (
    <Swiper
      modules={[Autoplay]}
      slidesPerView={3}
      spaceBetween={30}
      loop={true}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      navigation={{
        prevEl: "#testimonial-nav .prev",
        nextEl: "#testimonial-nav .next",
      }}
    >
      {testimonials.map((testimonial) => (
        <SwiperSlide key={testimonial.id}>
          <TestimonialCard testimonial={testimonial} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}