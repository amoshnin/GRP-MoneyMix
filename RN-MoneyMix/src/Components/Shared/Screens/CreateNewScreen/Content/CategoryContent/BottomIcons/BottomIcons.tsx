// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import SettingsIcon from "./SettingsIcon/SettingsIcon"
import DeleteIcon from "./DeleteIcon/DeleteIcon"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  selectedCurrency: string

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
  }

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  isIncome: boolean

  getFullCategoriesListThunkCreator: () => void
  deleteCategoryThunkCreator: (categoryID: string) => void
  combineCategoriesThunkCreator: (
    oldCategory: any,
    newCategory: any,
    isCombining: boolean
  ) => void
}

const CategoryContent: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <SettingsIcon
        navigation={props.navigation}
        isIncome={props.isIncome}
        selectedCurrency={props.selectedCurrency}
        category={props.category}
        totalIncomeCategoriesList={props.totalIncomeCategoriesList}
        totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        combineCategoriesThunkCreator={props.combineCategoriesThunkCreator}
        getFullCategoriesListThunkCreator={
          props.getFullCategoriesListThunkCreator
        }
      />

      <DeleteIcon
        navigation={props.navigation}
        category={props.category}
        deleteCategoryThunkCreator={props.deleteCategoryThunkCreator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 13,
    marginVertical: 23,
  },
})

export default React.memo(CategoryContent, isEqualMemoComparison)
