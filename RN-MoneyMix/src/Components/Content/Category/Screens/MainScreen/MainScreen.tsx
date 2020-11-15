// PLUGINS IMPORTS //
import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from "react-native"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import Body from "./Body/Body"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  isAuthentificated: boolean
  selectedCurrency: string

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  ImportantBills: Array<any>

  totalIncome: number | string | number
  totalExpenses: number | string | number

  InitialDate: string
  FinalDate: string
  DateType: string

  defaultBill: any
  operationsList: Array<any>
  budgetEnabledStatus: boolean

  setDateActionCreator: (initialDate: any, finalDate: any) => void
  ChangeImportantBillThunkCreator: (oldBill: any, newBill: any) => void
  getCategoriesListsThunkCreator: (includeArchived?: boolean) => any
  getImporantBillsThunkCreator: () => any
  getBillsListsThunkCreator: () => any
  getDefaultBillThunkCreator: () => void
  getOperationsListThunkCreator: (selectedFilers: Array<any>) => any
  getIncomeAndExpensesAmountThunkCreator: () => any
}

const Main: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(true as boolean)
  const [refreshing, setRefreshing] = useState(false as boolean)
  const isEditMode = props.route.params.isEditMode

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

  const getData = async () => {
    props.getBillsListsThunkCreator().then(() => {
      props.getCategoriesListsThunkCreator(isEditMode).then(() => {
        props.getIncomeAndExpensesAmountThunkCreator().then(() => {
          setLoading(false)
          setRefreshing(false)
        })
      })
    })
  }

  useEffect(() => {
    getData()
  }, [props.InitialDate])

  useEffect(() => {
    getData()
  }, [props.FinalDate])

  useEffect(() => {
    props.getCategoriesListsThunkCreator(isEditMode)
  }, [isEditMode])

  useEffect(() => {
    // props.navigation.addListener("focus", () => {
    //   getData();
    // });

    props
      .getImporantBillsThunkCreator()
      .then(() => props.getDefaultBillThunkCreator())
  }, [props.navigation])

  if (loading) {
    return (
      <View style={styles.loading_wrapper}>
        <ActivityIndicator color="#674ABE" size={"large"} />
      </View>
    )
  } else {
    return (
      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.wrapper}>
          <Header
            refreshing={refreshing}
            onRefresh={onRefresh}
            navigation={props.navigation}
            selectedCurrency={props.selectedCurrency}
            ImportantBills={props.ImportantBills}
            normalBillsList={props.normalBillsList}
            ChangeImportantBillThunkCreator={
              props.ChangeImportantBillThunkCreator
            }
          />

          <Body
            navigation={props.navigation}
            isAuthentificated={props.isAuthentificated}
            selectedCurrency={props.selectedCurrency}
            isIncome={props.route.params.isIncome}
            totalIncome={props.totalIncome}
            totalExpenses={props.totalExpenses}
            isEditMode={isEditMode}
            defaultBill={props.defaultBill}
            incomeCategoriesList={props.incomeCategoriesList}
            expensesCategoriesList={props.expensesCategoriesList}
            operationsList={props.operationsList}
            budgetEnabledStatus={props.budgetEnabledStatus}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },

  loading_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  micro: {
    bottom: 20,
    right: 40,
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: "#674ABE",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
  },
})

export default React.memo(Main, isEqualMemoComparison)
