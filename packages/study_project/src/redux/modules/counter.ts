// TODO: action & actionCreator & reducer

// type & interface
export interface InitialState {
  num: number;
}

// action
const INCREASE = 'counter/INCREASE';
const DECREASE = 'counter/DECREASE';

// actionCreator
export const Increase = () => ({ type: INCREASE });
export const Decrease = () => ({ type: DECREASE });

// set initial state
const initialState: InitialState = {
  num: 0,
};

// reducer
export default function counter(state = initialState, action: any) {
  switch (action.type) {
    case INCREASE:
      return {};
    case DECREASE:
      return {};
    default:
      return state;
  }
}
