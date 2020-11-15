import { AppStateType } from "~/Redux/ReduxStore"

export const getRecognitionInfo = (state: AppStateType) => {
  return state.VoiceRecognitionState.recognitionInfo
}
