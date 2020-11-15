// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import Main from "./Main"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  getOperationsListThunkCreator,
  getCustomOperationsListThunkCreator,
} from "~/Redux/Reducers/OperationsReducers/OperationsGetReducer"
import {
  ChangeOperationDateThunkCreator,
  addOperationCommentThunkCreator,
  DuplicateOperationThunkCreator,
  DeleteOperationsThunkCreator,
} from "~/Redux/Reducers/OperationsReducers/OperationsSetReducer"
import { ActionCreatorsList } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import {
  getSelectedCurrency,
  getInitialDate,
  getFinalDate,
  getOnlineStatus,
} from "~/Redux/Selectors/GeneralSelectors"
import { getOperationsList } from "~/Redux/Selectors/OperationsSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  isOnline: boolean
  selectedCurrency: string
  operationsList: Array<any>

  InitialDate: string
  FinalDate: string
}

type MapDispatchToPropsType = {
  setDateActionCreator: (
    initialDate: Date | number,
    finalDate: Date | number
  ) => void
  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
  DuplicateOperationThunkCreator: (operation: any) => void
  DeleteOperationsThunkCreator: (operations: Array<any>) => void
  getOperationsListThunkCreator: (selectedFilters: Array<string>) => void
  getCustomOperationsListThunkCreator: (
    searchValue: string,
    isCategory: boolean
  ) => void
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,
    //
    isOnline: getOnlineStatus(state),
    selectedCurrency: getSelectedCurrency(state),
    operationsList: getOperationsList(state),
    //
    InitialDate: getInitialDate(state) as any,
    FinalDate: getFinalDate(state) as any,
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(
    mapStateToProps,
    {
      setDateActionCreator: ActionCreatorsList.setDateActionCreator,
      ChangeOperationDateThunkCreator: ChangeOperationDateThunkCreator,
      addOperationCommentThunkCreator: addOperationCommentThunkCreator,
      DuplicateOperationThunkCreator: DuplicateOperationThunkCreator,
      DeleteOperationsThunkCreator: DeleteOperationsThunkCreator,
      getOperationsListThunkCreator: getOperationsListThunkCreator,
      getCustomOperationsListThunkCreator: getCustomOperationsListThunkCreator,
    }
  )
)(Main)
