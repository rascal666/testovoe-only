import React, {useEffect} from 'react';

import Header from "./components/header/header";
import TimeLine from "./components/timeLine/timeLine";
import InfoYear from "./components/InfoYear/InfoYear";

import {fetchHistoryEvent} from "./reducers/timeLineReducer";
import {useAppDispatch, useAppSelector} from "./hooks/hookReducer";

import './scss/loading.scss'

const App = () => {
    const dispatch = useAppDispatch()
    const {loading} = useAppSelector(state => state.historyEvent)

    useEffect(() => {
        for (let year = 1950; year <= 1970; year++) {
            dispatch(fetchHistoryEvent({year: year, text: 'science'} ))
        }
    }, [])


    return (
        <div>
            {
                loading == true?
                    <div className='loader'>
                        <span className="loader__spinner"></span>
                    </div>:
                    <div className='container'>
                        <Header title='Исторические даты'/>
                        <TimeLine/>
                        <InfoYear/>
                    </div>
            }
        </div>
    );
};

export default App;