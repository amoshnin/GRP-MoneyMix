// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import CalendarHeaderOption from "./CalendarHeaderOption"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import { ActionCreatorsList } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import {
  getInitialDate,
  getFinalDate,
  getDateType,
} from "~/Redux/Selectors/GeneralSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  InitialDate: Date | string | number
  FinalDate: Date | string | number
  DateType: string
}

type MapDispatchToPropsType = {
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  setDateTypeActionCreator: (dateType: string) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (
  state: AppStateType,
  props: any
): MapStateToPropsType => {
  return {
    InitialDate: getInitialDate(state),
    FinalDate: getFinalDate(state),
    DateType: getDateType(state),
  }
}

export default compose(
  connect(mapStateToProps, {
    setDateActionCreator: ActionCreatorsList.setDateActionCreator,
    setDateTypeActionCreator: ActionCreatorsList.setDateTypeActionCreator,
  })
)(CalendarHeaderOption)
