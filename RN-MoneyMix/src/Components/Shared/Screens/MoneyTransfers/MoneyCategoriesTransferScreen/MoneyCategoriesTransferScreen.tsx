// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet, BackHandler } from "react-native"

// COMPONENTS IMPORTS //
import TopSection from "~/Components/Shared/Screens/MoneyTransfers/Shared/Sections/TopSection/TopSection"
import Body from "./Body/Body"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isAuthentificated: boolean
  isOnline: boolean
  selectedCurrency: string
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => void
  getBillsListsThunkCreator: () => void
}

const MoneyCategoriesTransferScreen: React.FC<PropsType> = (props) => {
  const categoryData = props.route.params.categoryData
  const billData = props.route.params.billData
  const [selectedCategory, setSelectedCategory] = useState(categoryData as any)
  const [selectedBill, setSelectedBill] = useState(
    billData || (props.normalBillsList && (props.normalBillsList[0] as any))
  )
  const [isIncome, setIsIncome] = useState(
    props.route.params.isIncome as boolean
  )

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
      return true
    }

    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButton)
    })
  }, [props.navigation])

  const getData = async () => {
    props.getBillsListsThunkCreator()

    const data = await props.route.params.transData
    if (data.selectedCategory) {
      setSelectedCategory(data.selectedCategory)
    } else {
      setSelectedCategory(categoryData)
    }

    if (data.isIncome !== null) {
      setIsIncome(data.isIncome)
    } else {
      setIsIncome(props.route.params.isIncome)
    }
    if (data.selectedBill) {
      setSelectedBill(data.selectedBill)
    } else {
      if (billData && billData.name) {
        setSelectedBill(billData)
      } else {
        setSelectedBill(props.normalBillsList && props.normalBillsList[0])
      }
    }
  }

  const clearCache = async () => {
    setSelectedBill(null)
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [props.route.params])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      props.getBillsListsThunkCreator()
      getData()
    })
    props.navigation.addListener("blur", () => {
      clearCache()
    })
  }, [props.navigation])

  return (
    props.route.params.categoryData &&
    selectedBill && (
      <View style={styles.wrapper}>
        <TopSection
          navigation={props.navigation}
          isIncome={isIncome}
          setIsIncome={setIsIncome}
          selectedBill={selectedBill}
          setSelectedBill={setSelectedBill}
          setSelectedCategory={setSelectedCategory}
          selectedCategory={selectedCategory}
          selectedCurrency={props.selectedCurrency}
          normalBillsList={props.normalBillsList}
          debtsBillsList={props.debtsBillsList}
          savingsBillsList={props.savingsBillsList}
          totalIncomeCategoriesList={props.totalIncomeCategoriesList}
          totalExpensesCategoriesList={props.totalExpensesCategoriesList}
        />
        <Body
          navigation={props.navigation}
          route={props.route}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          storageData={props.storageData}
          //
          isIncome={isIncome}
          selectedCategory={selectedCategory}
          selectedBill={selectedBill}
          selectedCurrency={props.selectedCurrency}
          CategoryMoneyTransferThunkCreator={
            props.CategoryMoneyTransferThunkCreator
          }
        />
      </View>
    )
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
})

export default React.memo(MoneyCategoriesTransferScreen, isEqualMemoComparison)
