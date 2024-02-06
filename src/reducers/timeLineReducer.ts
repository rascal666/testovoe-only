
import {createSlice, PayloadAction, createAsyncThunk} from "@reduxjs/toolkit";


interface IinfoEvent {
    year: string
    eventText: string
}

type historyState = {
    info: object[]
    events: IinfoEvent[],
    error: string,
    loading: boolean
}

const initialState: historyState = {
    info: [
        {
        title: [
            {
                ru: 'наука',
                en: 'science'
            },
            {
                ru: 'медицина',
                en: 'science'
            },
            {
                ru: 'технологии',
                en: 'science'
            },
            {
                ru: 'спорт',
                en: 'science'
            },
            {
                ru: 'история',
                en: 'story'
            },
            {
                ru: 'животные',
                en: 'animals'
            },
            {
                ru: 'звезды',
                en: 'star'
            },
        ],
        yearStart: 1950,
        yearEnd: 1970,

    },
        {
            title: [
                {
                    ru: 'наука',
                    en: 'science'
                },
                {
                    ru: 'медицина',
                    en: 'science'
                },
                {
                    ru: 'технологии',
                    en: 'science'
                },
                {
                    ru: 'спорт',
                    en: 'science'
                },
                {
                    ru: 'образование',
                    en: 'science'
                },
            ],
            yearStart: 1970,
            yearEnd: 1990,

        },
        {
            title: [
                {
                    ru: 'наука',
                    en: 'science'
                },
                {
                    ru: 'медицина',
                    en: 'science'
                },
                {
                    ru: 'технологии',
                    en: 'science'
                },
                {
                    ru: 'спорт',
                    en: 'science'
                },
                {
                    ru: 'образование',
                    en: 'science'
                },
            ],
            yearStart: 1990,
            yearEnd: 2010,

        }],
    events: [],
    error: '',
    loading: false
}


export const fetchHistoryEvent = createAsyncThunk(
    'history/fetchHistory',
    async function ({year, text},{rejectWithValue, dispatch}) {
        dispatch(clearHistory('clear'));
        try {
            let response = await fetch(`https://api.api-ninjas.com/v1/historicalevents?text=${text}&year=${year}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'wcW7BdN0+Mh4kPOuIMldpQ==85YUzEt9Y6Z935qT',
                },
            });

            const data = await response.json()
            if (!response.ok) {
                throw new Error('данные не найдены');
            } else {
                if (data.length > 0) {
                    return data
                }
            }

            return false

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);


export const historySlice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        clearHistory(state) {
            state.events = []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHistoryEvent.fulfilled, (state:historyState, action:PayloadAction<object>) => {
                state.loading = false
                if (action.payload !== false) {
                    state.events = [...state.events, {
                        year: action.payload[0].year,
                        eventText: action.payload[0].event
                    }]
                }
            })
            .addCase(fetchHistoryEvent.rejected, (state:historyState, action:PayloadAction<string>) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(fetchHistoryEvent.pending, (state:historyState, action:PayloadAction<string>) => {
                state.loading = true
            })
    }
})

export default historySlice.reducer
export const {clearHistory} = historySlice.actions