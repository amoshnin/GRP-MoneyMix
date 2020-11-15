import { AppStateType } from "~/Redux/ReduxStore"

export const getTemplatesArray = (state: AppStateType) => {
  return state.TemplatesGetState.TemplatesArray
}
