import React, {useState} from 'react';
import './point.scss'


type initialState = {
    style: any,
    num: number,
    title: string,
    onClick: () => any
}
const Point = ({style, num, title, onClick} : initialState) => {
    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };
    const handleMouseLeave = () => {
        setIsHover(false);
    };


    return (
        <div onClick={onClick} onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <p className='point' style={style}></p>
            <div className={isHover ? 'point-active' : 'point-activeNone'} style={style}>
                <div className='point__span'>{num}</div>
                <p className='point__title'>{title}</p>
            </div>
        </div>
    );
};

export default Point;