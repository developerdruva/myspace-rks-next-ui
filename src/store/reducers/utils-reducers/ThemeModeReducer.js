const initialValues = {
  themeMode: "light",
};
export const ThemeModeReducer = (state = initialValues, action) => {
  switch (action.type) {
    case "THEME_MODE":
      return {
        ...state,
        themeMode: action.payload,
      };
    case "TOGGLE_THEME_MODE":
      return {
        ...state,
        themeMode: state.themeMode === "light" ? "dark" : "light",
      };
    default:
      return state;
  }
};
