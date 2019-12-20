import createReducer from '../common/createReducer';

const ADD = 'timeline/ADD';
const REMOVE = 'timeline/REMOVE';
const EDIT = 'timeline/EDIT';
const INCREASE_NEXT_PAGE = 'timeline/INCREACE_NEXT_PAGE';

export const addRimeline= ({type:ADD, timeline});
export const removeRimeline= ({type:REMOVE, timeline});
export const editRimeline= ({type:EDIT, timeline});
export const increaseNextPage = ({type:INCREACE_NEXT_PAGE});


const INITIAL_STATE = { timeline:[], nextPage:0 };

const reducer = createReducer(INITIAL_STATE, {
    [ADD]:(state, action) => state.timelines.push(action.timeline) ,
    [REMOVE]:(state, action) => (state.timelines.filter(
        timeline => timeline.id !== action.timeline.id
    )),
    [EDIT]: (state, action) => {
        const index = state.timelines.findIndex(
            timeline => timeline.id === action.timeline.id
        );
        if (index >= 0){
            state.timelines[index] = action.timeline;
        }
    }
    [INCREACE_NEXT_PAGE]: (state, action) => (state, nextPage += 1),
});

export default reducer;