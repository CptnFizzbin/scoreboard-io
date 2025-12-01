export function createThunkFactory<Dispatch, State>() {
  return (factory: (dispatch: Dispatch, getState: () => State) => void) => {
    return () => factory
  }
}
