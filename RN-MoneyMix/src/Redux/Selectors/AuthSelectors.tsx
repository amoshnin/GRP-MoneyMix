import { AppStateType } from "~/Redux/ReduxStore"

export const getLoginResponse = (state: AppStateType) => {
  return state.AuthSetState.LoginResponse
}
