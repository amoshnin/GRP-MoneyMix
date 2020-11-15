// PLUGINS IMPORTS //
import React, { useState, useCallback, useEffect } from "react"
import {
  View,
  Text,
  ScrollView,
  RefreshControl,
  BackHandler,
  StyleSheet,
} from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SectionItem from "./SectionItem/SectionItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedCurrency: string
  //
  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>
  savingsBillsList: Array<any>
  //
  BudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }

  NonBudgetedArrays: {
    Income: Array<any>
    Expenses: Array<any>
    Savings: Array<any>
  }
  //
  totalIncome: number | string | number
  totalExpenses: number | string | number
  savingsMoneyAmount: number | string
  //
  InitialDate: string
  FinalDate: string

  setDateActionCreator: (initialDate: any, finalDate: any) => void
  getBudgetsThunkCreator: () => any
  getBillsListsThunkCreator: () => any
  getBillsMoneyAmountThunkCreator: () => any
  getCategoriesListsThunkCreator: (includeArchived?: boolean) => any
  getIncomeAndExpensesAmountThunkCreator: () => any
}

const Budget: React.FC<PropsType> = (props) => {
  const [refreshing, setRefreshing] = useState(false as boolean)
  const { t } = useTranslation()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton as any)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton as any
      )
    })
  }, [props.navigation])

  const getData = () => {
    props
      .getCategoriesListsThunkCreator()
      .then(() => props.getIncomeAndExpensesAmountThunkCreator())
      .then(() => props.getBillsListsThunkCreator())
      .then(() => props.getBillsMoneyAmountThunkCreator())
      .then(() => props.getBudgetsThunkCreator())
      .then(() => setRefreshing(false))
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [props.InitialDate])

  useEffect(() => {
    getData()
  }, [props.FinalDate])

  // ALLOW VISIBLITY //
  const allowIncomeVisiblity =
    (props.NonBudgetedArrays.Income &&
      props.NonBudgetedArrays.Income.length > 0) ||
    (props.BudgetedArrays.Income && props.BudgetedArrays.Income.length > 0)

  const allowExpensesVisivility =
    (props.NonBudgetedArrays.Expenses &&
      props.NonBudgetedArrays.Expenses.length > 0) ||
    (props.BudgetedArrays.Expenses && props.BudgetedArrays.Expenses.length > 0)

  const allowSavingsVisiblity =
    (props.NonBudgetedArrays.Savings &&
      props.NonBudgetedArrays.Savings.length > 0) ||
    (props.BudgetedArrays.Savings && props.BudgetedArrays.Savings.length > 0)

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#674ABE"]}
        />
      }
    >
      {allowIncomeVisiblity && (
        <SectionItem
          navigation={props.navigation}
          title={t("Categories.Main.Income")}
          rightSubtitle={t("CreateScreen.Body.Goal")}
          leftSubtitle={t("Budget.Earned")}
          //
          selectedCurrency={props.selectedCurrency}
          budgetedFieldsArray={props.BudgetedArrays.Income}
          fieldsArray={props.NonBudgetedArrays.Income}
          totalValue={props.totalIncome}
          isIncome={true}
        />
      )}

      {allowExpensesVisivility && (
        <SectionItem
          navigation={props.navigation}
          title={t("Categories.Main.Expenses")}
          rightSubtitle={t("DrawerNavigator.ButtonsList.Budget")}
          leftSubtitle={t("Budget.Spent")}
          //
          selectedCurrency={props.selectedCurrency}
          budgetedFieldsArray={props.BudgetedArrays.Expenses}
          fieldsArray={props.NonBudgetedArrays.Expenses}
          totalValue={props.totalExpenses}
          isIncome={false}
        />
      )}

      {allowSavingsVisiblity && (
        <SectionItem
          navigation={props.navigation}
          title={t("BillsScreen.Lists.Savings")}
          rightSubtitle={t("CreateScreen.Body.Goal")}
          leftSubtitle={t("Budget.PlacedOnHold")}
          //
          selectedCurrency={props.selectedCurrency}
          budgetedFieldsArray={props.BudgetedArrays.Savings}
          fieldsArray={props.NonBudgetedArrays.Savings}
          totalValue={props.savingsMoneyAmount}
          isBill={true}
        />
      )}

      {!allowIncomeVisiblity &&
        !allowExpensesVisivility &&
        !allowSavingsVisiblity && (
          <View style={styles.empty_container}>
            <EmptyListSVG height={225} width={225} />
            <Text style={styles.empty_text}>{t("EmptyLists.Budget")}</Text>
          </View>
        )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  empty_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: "35%",
    marginHorizontal: 20,
  },

  empty_text: {
    fontSize: 16,
    textAlign: "center",
  },
})

export default React.memo(Budget, isEqualMemoComparison)
