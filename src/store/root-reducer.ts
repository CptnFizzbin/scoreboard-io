interface Action {
  type:string;
  data:any;
}

export function rootReducer(state = {}, action:Action) {
  return state;
}
