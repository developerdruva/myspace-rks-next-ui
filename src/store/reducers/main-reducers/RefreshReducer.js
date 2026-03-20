const initialValue = {
  isRefresh: true,
};

export const RefreshReducer = (state = initialValue, action) => {
  switch (action.type) {
    case "REFRESH_GLOBAL_STATE":
      return {
        ...state,
        isRefresh: action.payload,
      };
    default:
      return state;
  }
};
