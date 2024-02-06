import React from 'react';

import {useAppSelector} from "../../hooks/hookReducer";

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import './InfoYear.scss'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss';
import '../../scss/swiper.scss'

import arrowImg from "../../../accept/img/arrow.png";

const InfoYear = () => {
    const {events, error} = useAppSelector(state => state.historyEvent)
    const navigationNextRef = React.useRef(null)
    const navigationPrevRef = React.useRef(null)
    const paginationRef = React.useRef(null)

    return (
        <div className='InfoYear'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={50}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                loop={true}
                pagination={{
                    el: paginationRef.current,
                    clickable: true,
                }}
                breakpoints={{
                    1024: {
                        slidesPerView: 3,
                    },
                    320: {
                        slidesPerView: 1.5,
                        pagination: {
                            type: 'bullets',
                        },
                    },
                }}
            >

                {
                    error !== '' ? <p className='InfoYear__error'>{error}</p>:
                        events.length > 0?
                    events.map((event, key)=> {
                        return (
                            <SwiperSlide key={key}>
                                {({isActive}) => (
                                    <div
                                        className={isActive ? 'swiper-active InfoYear__contain' : 'swiper-not-active InfoYear__contain'}
                                        >
                                        <p className='InfoYear__year'>{event.year}</p>
                                        <p className='InfoYear__text'>{event.eventText}</p>
                                    </div>
                                )}
                            </SwiperSlide>
                        );
                    }): <p>данные по таким параметрам не найдены</p>
                }
                <div className='swiper__buttons swiper__buttons-two'>
                    <div className='swiper__button swiper__button-two-hidden' ref={navigationPrevRef} >
                        <img className='swiper__button-prev' src={arrowImg} alt=""/>
                    </div>
                    <div className='swiper__button ' ref={navigationNextRef} >
                        <img className='swiper__button-next' src={arrowImg} alt=""/>
                    </div>
                </div>
                <div className='swiper__pagination' ref={paginationRef}></div>
            </Swiper>
        </div>
    );
};

export default InfoYear;