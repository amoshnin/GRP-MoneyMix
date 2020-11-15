// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import {
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from "react-native"
import AsyncStorage from "@react-native-community/async-storage"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import Body from "./Body/Body"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string

  totalIncome: number | string
  totalExpenses: number | string

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  defaultBill: any
  operationsList: Array<any>

  InitialDate: string
  FinalDate: string

  setDateActionCreator: (initialDate: any, finalDate: any) => void
  getOperationsListThunkCreator: (selectedFilters: Array<string>) => any
  getCategoriesListsThunkCreator: (includeArchived?: boolean) => any
  getIncomeAndExpensesAmountThunkCreator: () => any
}

const Main: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(true as boolean)
  const [isIncome, setIsIncome] = useState(false as boolean)

  const getData = () => {
    props.getCategoriesListsThunkCreator().then(() => {
      props.getIncomeAndExpensesAmountThunkCreator().then(() => {
        props.getOperationsListThunkCreator([]).then(() => {
          setLoading(false)
        })
      })
    })
  }

  useEffect(() => {
    props.navigation.addListener("focus", async () => {
      const initialStatsScreen = await AsyncStorage.getItem(
        "selectedStatsInitialScreen"
      )
      setIsIncome(initialStatsScreen === "Expenses" ? false : true)
      getData()

      BackHandler.addEventListener("hardwareBackPress", handleBackButton as any)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton as any
      )
    })
  }, [props.navigation])

  useEffect(() => {
    getData()
  }, [props.InitialDate])

  useEffect(() => {
    getData()
  }, [props.FinalDate])

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
            navigation={props.navigation}
            expensesAmount={Number(props.totalExpenses)}
            incomeAmount={Number(props.totalIncome)}
            selectedCurrency={props.selectedCurrency}
            setIsIncome={setIsIncome}
          />
          <Body
            navigation={props.navigation}
            expensesAmount={Number(props.totalExpenses)}
            incomeAmount={Number(props.totalIncome)}
            selectedCurrency={props.selectedCurrency}
            incomeCategoriesList={props.incomeCategoriesList}
            expensesCategoriesList={props.expensesCategoriesList}
            defaultBill={props.defaultBill}
            operationsList={props.operationsList}
            isIncome={isIncome}
            setLoading={setLoading}
          />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: "100%",
  },

  loading_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(Main, isEqualMemoComparison)
