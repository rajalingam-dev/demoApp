
const initialState = {
  sidebarShow: "responsive",
};

export const changeStateReducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    default:
      return state;
  }
};
