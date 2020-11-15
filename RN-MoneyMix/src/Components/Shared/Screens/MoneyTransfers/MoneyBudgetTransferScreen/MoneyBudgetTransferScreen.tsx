// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, StyleSheet, BackHandler } from "react-native"

// COMPONENTS IMPORTS //
import TopSection from "./TopSection/TopSection"
import Body from "./Body/Body"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  selectedCurrency: string

  addCertainCategoryBudgetThunkCreator: (
    category: any,
    isIncome: boolean,
    budget: string | number
  ) => void
  addCertainSavingBillBudgetThunkCreator: (
    savingBill: any,
    budget: number
  ) => void
}

const MoneyBudgetTransferScreen: React.FC<PropsType> = (props) => {
  const { data, isSavingsBill, isIncome } = props.route.params

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
    }

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

  return (
    <View style={styles.container}>
      <TopSection
        data={data}
        selectedCurrency={props.selectedCurrency}
        isSavingsBill={isSavingsBill}
        isIncome={isIncome}
      />
      <Body
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        data={data}
        isIncome={isIncome}
        isSavingsBill={isSavingsBill}
        addCertainCategoryBudgetThunkCreator={
          props.addCertainCategoryBudgetThunkCreator
        }
        addCertainSavingBillBudgetThunkCreator={
          props.addCertainSavingBillBudgetThunkCreator
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
})

export default React.memo(MoneyBudgetTransferScreen, isEqualMemoComparison)
