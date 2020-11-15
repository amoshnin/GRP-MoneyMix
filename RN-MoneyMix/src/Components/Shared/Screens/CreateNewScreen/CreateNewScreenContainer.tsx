// PLUGINS IMPORTS //
import { compose } from "redux"
import { connect } from "react-redux"

// COMPONENTS IMPORTS //
import CreateNewScreen from "./CreateNewScreen"

// EXTRA IMPORTS //
import { AppStateType } from "~/Redux/ReduxStore"
// >>Reducers<< //
import {
  SubmitNewCategoryThunkCreator,
  deleteCategoryThunkCreator,
  combineCategoriesThunkCreator,
  convertSubCategoryToCategoryThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesSetReducer"
import {
  SubmitNewBillThunkCreator,
  DeleteBillThunkCreator,
} from "~/Redux/Reducers/BillsRedcers/BillsSetReducer"
import {
  getCategoriesListsThunkCreator,
  getUsedIconsArrayThunkCreator,
} from "~/Redux/Reducers/CateoriesReducers/CategoriesGetReducer"
import { getFullCategoriesListThunkCreator } from "~/Redux/Reducers/GeneralReducers/GeneralGetReducer"
// >>Selectors<< //
import { getSelectedCurrency } from "~/Redux/Selectors/GeneralSelectors"
import {
  getNormalBillsList,
  getDebtsBillsList,
  getSavingsBillsList,
} from "~/Redux/Selectors/BillsSelectors"
import {
  getTotalIncomeCategoriesList,
  getTotalExpensesCategoriesList,
  getUsedIconsArray,
} from "~/Redux/Selectors/CategoriesSelectors"

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// TYPES
type MapStateToPropsType = {
  navigation: any
  route: any

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
    subCategories: Array<any>
    archived: boolean
  }
  isIncome: boolean
  billType: any
  billEditData: any
  isCategoryCreate: boolean
  selectedCurrency: string
  usedIconsArray: Array<string>
  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>
}

type MapDispatchToPropsType = {
  SubmitNewCategoryThunkCreator: (
    isIncome: boolean,
    newCategoryTitle: string,
    selectedIcon: string,
    selectedColor: string,
    archived: boolean,
    subCategories: Array<any>,
    deletingSubCategories: Array<any>,
    id: string
  ) => void
  getCategoriesListsThunkCreator: () => void
  getUsedIconsArrayThunkCreator: () => void
  getFullCategoriesListThunkCreator: () => void
  deleteCategoryThunkCreator: (categoryID: string) => void
  combineCategoriesThunkCreator: (oldCategory: any, newCategory: any, isCombining: boolean) => void
  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
  // BILLS
  SubmitNewBillThunkCreator: any
  DeleteBillThunkCreator: any
}

/////////////////////////////////////////////////////////////////

const mapStateToProps = (state: any, props: any): MapStateToPropsType => {
  return {
    navigation: props.navigation,
    route: props.route,

    category: props.route.params.category,
    isIncome: props.route.params.isIncome,
    isCategoryCreate: props.route.params.isCategoryCreate,
    //
    billType: props.route.params.billType,
    billEditData: props.route.params.billEditData,
    //
    selectedCurrency: getSelectedCurrency(state),
    usedIconsArray: getUsedIconsArray(state),
    normalBillsList: getNormalBillsList(state),
    debtsBillsList: getDebtsBillsList(state),
    savingsBillsList: getSavingsBillsList(state),
    totalIncomeCategoriesList: getTotalIncomeCategoriesList(state),
    totalExpensesCategoriesList: getTotalExpensesCategoriesList(state),
  }
}

export default compose(
  connect<MapStateToPropsType, MapDispatchToPropsType, AppStateType>(mapStateToProps, {
    //  CATEGORIES
    SubmitNewCategoryThunkCreator: SubmitNewCategoryThunkCreator,
    getCategoriesListsThunkCreator: getCategoriesListsThunkCreator,
    getUsedIconsArrayThunkCreator: getUsedIconsArrayThunkCreator,
    getFullCategoriesListThunkCreator: getFullCategoriesListThunkCreator,
    deleteCategoryThunkCreator: deleteCategoryThunkCreator,
    combineCategoriesThunkCreator: combineCategoriesThunkCreator,
    convertSubCategoryToCategoryThunkCreator: convertSubCategoryToCategoryThunkCreator,
    // BILLS
    SubmitNewBillThunkCreator: SubmitNewBillThunkCreator,
    DeleteBillThunkCreator: DeleteBillThunkCreator,
  })
)(CreateNewScreen)
