import React from 'react';

import {Navigation, Pagination, Scrollbar, A11y} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import Categories from "../categories/categories";

import {useAppSelector} from "../../hooks/hookReducer";

import arrowImg from '../../../accept/img/arrow.png'

import './timeLine.scss'
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import 'swiper/scss';
import '../../scss/swiper.scss'

const TimeLine = () => {
    const {info} = useAppSelector(state => state.historyEvent)
    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)
    const paginationRef = React.useRef(null);


    return (
        <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
            }}
            pagination={{
                el: paginationRef.current,
                clickable: true,
            }}
            breakpoints={{
                1024: {
                    pagination: {
                        type: 'fraction',

                    },
                },
                320: {
                    pagination: {
                        type: 'bullets',
                    },
                },
            }}
        >

            {
                info.map((item, key) => {
                    return (
                        <SwiperSlide key={key}>
                            <div  className='timeLine'>
                                <div className='timeLine__year'><span
                                    className='timeLine__year-blue'>{item.yearStart}</span> <span
                                    className='timeLine__year-pink'>{item.yearEnd}</span></div>
                                <Categories yearStart={item.yearStart} yearEnd={item.yearEnd} title={item.title}
                                            pointState={item.title.length} />
                            </div>
                        </SwiperSlide>
                    );
                })
            }
            <div className='swiper__pagination' ref={paginationRef}></div>
            <div className='swiper__buttons'>
                <div className='swiper__button' ref={navigationPrevRef}>
                    <img className='swiper__button-prev' src={arrowImg} alt=""/>
                </div>
                <div className='swiper__button ' ref={navigationNextRef}>
                    <img className='swiper__button-next' src={arrowImg} alt=""/>
                </div>
            </div>

        </Swiper>


    );
};

export default TimeLine;