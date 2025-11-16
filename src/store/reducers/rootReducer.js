import { combineReducers } from "redux";
import { SpinnerReducer } from "./utils-reducers/SpinnerReducer";
import { ThemeModeReducer } from "./utils-reducers/ThemeModeReducer";
import { PortfolioReducer } from "./main-reducers/PortfolioReducer";
import { FieldPropsReducer } from "./resume-reducers/FieldPropsReducer";
import { PortfolioDetailsCallReducer } from "./main-reducers/PortfolioDetailsCallReducer";

const rootReducer = combineReducers({
    spinner: SpinnerReducer,
    themeModeState: ThemeModeReducer,
    portfolioState: PortfolioReducer,
    fieldPropState: FieldPropsReducer,
    portfolioCallState: PortfolioDetailsCallReducer,
});

export default rootReducer;