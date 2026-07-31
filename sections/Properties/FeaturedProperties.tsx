"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import PropertyCard from "./PropertyCard";

type Props = {
  properties: any[];
};

export default function FeaturedProperties({ properties }: Props) {
  return (
    <div className="section">
      <div className="container">
        <div className="row mb-5 align-items-center">
          <div className="col-lg-6 text-center mx-auto">
            <h2 className="heading text-primary">
              Featured Properties
            </h2>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={30}
          loop
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1200: {
              slidesPerView: 3,
            },
          }}
        >
          {properties.map((property: any) => (
            <SwiperSlide key={property.id}>
              <PropertyCard property={property} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}