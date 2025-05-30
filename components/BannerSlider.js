import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';

import tokopediaBanner from '../../assets/banners/banner.home.tokopedia.jpg';
import allintourBanner from '../../assets/banners/banner.home.allintour.jpg';
import jtrustBanner from '../../assets/banners/banner.home.jtrust.webp';
import valkyrie48Banner from '../../assets/banners/banner.home.valkyrie48.jpg';
import jkt48vBanner from '../../assets/banners/banner.home.jkt48v.jpg';

SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);

const banners = [
  { id: 1, src: tokopediaBanner, alt: 'Tokopedia Banner' },
  { id: 2, src: allintourBanner, alt: 'Allintour Banner' },
  { id: 3, src: jtrustBanner, alt: 'JTrust Bank Banner' },
  { id: 4, src: valkyrie48Banner, alt: 'Valkyrie48 Banner' },
  { id: 5, src: jkt48vBanner, alt: 'JKT48V Banner' },
];

const BANNER_ASPECT_RATIO_WIDTH = 1024;
const BANNER_ASPECT_RATIO_HEIGHT = 591;

export default function BannerSlider() {
  return (
    <div className="w-full">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        effect="slide"
        className="rounded-lg shadow-2xl overflow-hidden"
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
