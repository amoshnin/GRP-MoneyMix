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

  MoneyBillsRefillBalanceThunkCreator: (
    billData: any,
    newBalance: string
  ) => void
}

const MoneyCategoriesTransferScreen: React.FC<PropsType> = (props) => {
  const billData = props.route.params.billData

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

  return (
    <View style={styles.wrapper}>
      <TopSection
        billData={billData}
        selectedCurrency={props.selectedCurrency}
      />

      <Body
        navigation={props.navigation}
        billData={billData}
        selectedCurrency={props.selectedCurrency}
        MoneyBillsRefillBalanceThunkCreator={
          props.MoneyBillsRefillBalanceThunkCreator
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
})

export default React.memo(MoneyCategoriesTransferScreen, isEqualMemoComparison)
