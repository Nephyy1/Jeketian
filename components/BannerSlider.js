import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const banners = [
  { id: 1, src: '/banners/banner.home.tokopedia.jpg', alt: 'Tokopedia Banner' },
  { id: 2, src: '/banners/banner.home.allintour.jpg', alt: 'Allintour Banner' },
  { id: 3, src: '/banners/banner.home.jtrust.webp', alt: 'JTrust Bank Banner' },
  { id: 4, src: '/banners/banner.home.valkyrie48.jpg', alt: 'Valkyrie48 Banner' },
  { id: 5, src: '/banners/banner.home.jkt48v.jpg', alt: 'JKT48V Banner' },
];

const BANNER_ASPECT_RATIO_WIDTH = 1024;
const BANNER_ASPECT_RATIO_HEIGHT = 591;

export default function BannerSlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={true}
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="slide"
        className="rounded-b-lg shadow-2xl overflow-hidden"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="w-full relative" style={{ aspectRatio: `${BANNER_ASPECT_RATIO_WIDTH}/${BANNER_ASPECT_RATIO_HEIGHT}` }}>
              <Image
                src={banner.src}
                alt={banner.alt}
                layout="fill"
                objectFit="cover"
                priority={banner.id === 1}
                placeholder="blur"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
