import { combineReducers } from "redux";
import { SpinnerReducer } from "./utils-reducers/SpinnerReducer";
import { ThemeModeReducer } from "./utils-reducers/ThemeModeReducer";
import { PortfolioReducer } from "./main-reducers/PortfolioReducer";
import { FieldPropsReducer } from "./resume-reducers/FieldPropsReducer";
import { PortfolioDetailsCallReducer } from "./main-reducers/PortfolioDetailsCallReducer";
import { RefreshReducer } from "./main-reducers/RefreshReducer";

const rootReducer = combineReducers({
  spinner: SpinnerReducer,
  globalRefresh: RefreshReducer,
  themeModeState: ThemeModeReducer,
  portfolioState: PortfolioReducer,
  fieldPropState: FieldPropsReducer,
  portfolioCallState: PortfolioDetailsCallReducer,
});

export default rootReducer;
