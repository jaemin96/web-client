// TODO: action & actionCreator & reducer

// type & interface
export interface InitialState {
  num: number;
}

type CounterAction = {
  type: typeof INCREASE | typeof DECREASE;
};

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
export default function counter(state = initialState, action: CounterAction) {
  switch (action.type) {
    case INCREASE:
      return { num: state.num + 1 };
    case DECREASE:
      return { num: state.num - 1 };
    default:
      return state;
  }
}
