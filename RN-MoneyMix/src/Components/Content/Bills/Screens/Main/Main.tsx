// PLUGINS IMPORTS //
import React, { useEffect, useState, useCallback } from "react"
import {
  View,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from "react-native"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import Body from "./Body/Body"
import CreateNewBillPopup from "./CreateNewBillPopup/CreateNewBillPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  selectedCurrency: string

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  debtsBillsList: Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
    icon: string
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
    icon: string
  }>

  billsMoneyAmount: number | string
  debtsMoneyAmount: number | string
  savingsMoneyAmount: number | string

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  defaultBill: any

  getBillsListsThunkCreator: () => any
  getBillsMoneyAmountThunkCreator: () => any
  getFullCategoriesListThunkCreator: () => void
  getDefaultBillThunkCreator: () => void
  setDefaultBillThunkCreator: (defaultBill: any) => void
}

const Main: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(true as boolean)
  const [refreshing, setRefreshing] = useState(false as boolean)

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
    props.getBillsListsThunkCreator().then(() => {
      props.getBillsMoneyAmountThunkCreator().then(() => {
        setRefreshing(false)
        setLoading(false)
      })
    })
  }

  useEffect(() => {
    getData()
  }, [])

  // useEffect(() => {
  //   props.navigation.addListener("focus", () => {
  //     getData();
  //   });
  // }, [props.navigation]);

  if (loading) {
    return (
      <View style={styles.loading_wrapper}>
        <ActivityIndicator color="#674ABE" size={"large"} />
      </View>
    )
  } else {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#674ABE"]}
            />
          }
        >
          <Header
            navigation={props.navigation}
            selectedCurrency={props.selectedCurrency}
            //
            billsMoneyAmount={props.billsMoneyAmount}
            debtsMoneyAmount={props.debtsMoneyAmount}
            savingsMoneyAmount={props.savingsMoneyAmount}
          />
        </ScrollView>
        <Body
          navigation={props.navigation}
          selectedCurrency={props.selectedCurrency}
          //
          normalBillsList={props.normalBillsList}
          debtsBillsList={props.debtsBillsList}
          savingsBillsList={props.savingsBillsList}
          //
          defaultBill={props.defaultBill}
          totalIncomeCategoriesList={props.totalIncomeCategoriesList}
          totalExpensesCategoriesList={props.totalExpensesCategoriesList}
          getFullCategoriesListThunkCreator={
            props.getFullCategoriesListThunkCreator
          }
          getDefaultBillThunkCreator={props.getDefaultBillThunkCreator}
          setDefaultBillThunkCreator={props.setDefaultBillThunkCreator}
        />

        <CreateNewBillPopup
          navigation={props.navigation}
          popupVisible={props.route.params.createNewBillPopupVisible}
        />
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

  button: {
    marginVertical: 11,
    justifyContent: "space-between",
  },

  button_text: {
    fontSize: 15,
  },

  button_content_text: {
    opacity: 0.5,
    fontSize: 13,
  },
})

export default React.memo(Main, isEqualMemoComparison)
