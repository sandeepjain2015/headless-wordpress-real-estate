"use client";
import PropertyCard from "./PropertyCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

export default function PropertySlider({ properties }: { properties: any[] }) {
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
        >
            {properties.map((property) => (
                <SwiperSlide key={property.featuredImage?.node?.uri || property.id}>
                    <PropertyCard {...property} />
                </SwiperSlide>
            ))}
        </Swiper>
    )
}