const initialState = {
  minimizer: false,
};

const sidebarMinimizerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_SIDEBAR_STATE":
      return {
        ...state,
        minimizer: !state.minimizer,
      };
    default:
      return state;
  }
};

export default sidebarMinimizerReducer;
