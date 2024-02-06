import React, {useState, useEffect, CSSProperties} from 'react';

import Point from "../point/point";

import {useAppDispatch} from "../../hooks/hookReducer";
import {fetchHistoryEvent} from "../../reducers/timeLineReducer";

import './categories.scss'

type initialState = {
    yearStart: number,
    yearEnd: number,
    title: Array<object>,
    pointState:number

}
const Categories = ({yearStart, yearEnd , title, pointState} : initialState) => {
    const dispatch = useAppDispatch()

    const [point, setPoint] = useState([])
    const diameter = 530
    const radius = diameter/2
    const points = pointState
    const circleStyle = {
            width: diameter+ 'px',
            height: diameter + 'px'
    }


    useEffect(() => {
        let newPoints = [];
            for (let i = 0; i < points; i++) {
                const angle = (i / points) * Math.PI * 2;
                const x = radius * Math.cos(angle) + radius;
                const y = radius * Math.sin(angle) + radius;
                newPoints.push({ x, y });
            }
        setPoint(newPoints);
        }, [radius, points]);


    function  fetchEventsForYearRange (startYear: number, endYear: number, text: string) {
        for (let year = startYear; year <= endYear; year++) {
            dispatch(fetchHistoryEvent({year: year, text: text} ))
        }
    };

    return (
        <div>
            <div className='circle' style={circleStyle}>
                <div className='circle__line'></div>
                {
                    point.map((item, idx) => {
                        let container: CSSProperties = {
                            position: "absolute",
                            fontSize: 20 + 'px',
                            left: item.x + 'px',
                            top: item.y + 'px',
                            transform: 'translate(-50%, -50%)'
                        };

                        return (
                            <Point key={idx} onClick={() => fetchEventsForYearRange(yearStart, yearEnd, title[idx].en)}
                                   num={idx + 1} style={container} title={title[idx].ru}/>
                        )
                    })
                }
            </div>

            <div className='categories'>
                {
                    point.map((cat, idx) => {
                        return (
                            <div key={idx} onClick={() => fetchEventsForYearRange(yearStart, yearEnd, title[idx].en)}
                                 className='categories__block'>
                                <p className='categories__item'>{title[idx].ru}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Categories;
