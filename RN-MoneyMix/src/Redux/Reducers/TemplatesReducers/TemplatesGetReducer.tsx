//    *GENERAL IMPORTS*   //
import { ThunkAction } from "redux-thunk";
import { AppStateType, InferActionsTypes } from "~/Redux/ReduxStore";
import AsyncStorage from "@react-native-community/async-storage";

////////////////////////////////////////////////////////////////////////

const initialState = {
  TemplatesArray: [] as Array<{
    templateTitle: string;
    isIncome: boolean;
    category: any;
    bill: any;
    newMoneyAmount: number | string;
    comment: string;
    selectedImages: Array<any>;
    selectedDate: Date | string | null;
    selectedSubCategory: any;
    ID: string;
  }>,
};

type initialStateType = typeof initialState;

// *REDUCER* //
const TemplatesGetReducer = (
  state = initialState,
  action: ActionTypes,
): initialStateType => {
  if (action.type === "SET_TEMPLATES_ARRAY") {
    return {
      ...state,
      TemplatesArray: action.templatesArray,
    };
  }

  return state;
};

export default TemplatesGetReducer;

///////////////////////////////////////////////////////////////////////

type ActionTypes = InferActionsTypes<typeof ActionCreatorsList>;

//    *ACTION CREATORS*   //
export const ActionCreatorsList = {
  setTemplatesArrayActionCreator: (templatesArray: Array<any>) => ({
    type: "SET_TEMPLATES_ARRAY",
    templatesArray,
  } as const),
};

//    *THUNKS*   //
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>;

// Get templates array
export const getTemplatesArrayThunkCreator = (): ThunkType => {
  return async (dispatch, getState, { getFirebase, getFirestore }: any) => {
    await AsyncStorage.getItem("templates")
      .then((req: any) => JSON.parse(req))
      .then(async (json) => {
        dispatch(ActionCreatorsList.setTemplatesArrayActionCreator(json));
      });
  };
};
