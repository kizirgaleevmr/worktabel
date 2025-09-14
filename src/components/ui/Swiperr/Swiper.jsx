import {
    Navigation,
    Pagination,
    Scrollbar,
    A11y,
    Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
export default () => {
    return (
        <div className="ml-100 w-470">
            <Swiper
                className=""
                modules={[Navigation, Scrollbar, A11y, Autoplay]}
                autoplay={{
                    delay: 2500, // Time in ms between slides
                    disableOnInteraction: false, // Continue autoplay after user interaction
                    pauseOnMouseEnter: true, // Pause autoplay when mouse hovers over swiper
                }}
                // install Swiper modules
                speed={3000}
                spaceBetween={50}
                slidesPerView={1}
                allowTouchMove={true}
                scrollbar={{
                    // el: ".swiper-scrollbar",
                    draggable: true,
                    horizontalClass: "swiper-scrollbar1111",
                }}
                loop={true}
            >
                <SwiperSlide className="w-full">
                    <h1 className="text-white text-6xl absolute bottom-30 left-30">
                        ЧТо то о нашей компании
                    </h1>
                    <img src="/src/assets/tech1.jpg" alt="photo1" />
                </SwiperSlide>
                <SwiperSlide className="w-full">
                    <h1 className="text-white text-6xl absolute bottom-30 left-30">
                        Прподолжение о нашей компании
                    </h1>
                    <img src="/src/assets/tech2.jpg" alt="photo2" />
                </SwiperSlide>
                <SwiperSlide className="w-full">
                    <h1 className="text-white text-6xl absolute bottom-30 left-30">
                        Еще о нашей компании
                    </h1>
                    <img src="/src/assets/tech3.jpeg" alt="photo3" />
                </SwiperSlide>
                <SwiperSlide className="w-full">
                    <h1 className="text-white text-6xl absolute bottom-30 left-30">
                        И еще о нашей компании
                    </h1>
                    <img src="/src/assets/tech4.jpeg" alt="photo4" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};
