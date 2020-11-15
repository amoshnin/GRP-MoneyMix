import { AppStateType } from "~/Redux/ReduxStore"

export const getOperationsList = (state: AppStateType) => {
  return state.OperationsGetState.operationsList
}
