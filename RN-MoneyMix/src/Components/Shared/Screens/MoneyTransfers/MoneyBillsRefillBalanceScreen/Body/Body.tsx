// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import FirstLine from "./CalculatorSections/FirstLine/FirstLine"
import SecondLine from "./CalculatorSections/SecondLine/SecondLine"
import NumberPad from "./CalculatorSections/NumberPad/NumberPad"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  billData: any
  selectedCurrency: string | null
  MoneyBillsRefillBalanceThunkCreator: (
    billData: any,
    newBalance: string
  ) => any
}

const Body: React.FC<PropsType> = (props) => {
  const [moneyAmount, setMoneyAmount] = useState(0 as number)
  const [newMoneyAmount, setNewMoneyAmount] = useState("" as string)
  const [sign, setSign] = useState(null as any)
  const [totalValue, setTotalValue] = useState("" as string)

  useEffect(() => {
    setMoneyAmount(props.billData.price || "")
  }, [])

  useEffect(() => {
    setMoneyAmount(props.billData.price || "")
  }, [props.billData])

  useEffect(() => {
    setTotalValue(
      props.billData?.type === "NormalBill"
        ? String(props.billData.accountBalance || 0)
        : String(props.billData?.type) === "SavingsBill"
        ? String(Number(props.billData.accountBalance || 0))
        : props.billData?.type === "DebtBill"
        ? String(
            Number(props.billData.totalDebtSum || 0) -
              Number(props.billData.iOwe || 0)
          )
        : String(props.billData.price || 0)
    )
  }, [props.billData])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setMoneyAmount(props.billData.accountBalance)
    })

    props.navigation.addListener("blur", () => {
      setMoneyAmount(0)
      setNewMoneyAmount("")
      setSign(null)
    })
  }, [props.navigation])

  const sendNewMoney = () => {
    props.MoneyBillsRefillBalanceThunkCreator(props.billData, totalValue)
    props.navigation.navigate("BottomTabNavigator")
  }

  return (
    <View style={styles.container}>
      <FirstLine />
      <SecondLine
        navigation={props.navigation}
        moneyAmount={moneyAmount as number}
        newMoneyAmount={newMoneyAmount}
        totalValue={totalValue}
        selectedCurrency={props.selectedCurrency}
        sign={sign}
      />
      <NumberPad
        navigation={props.navigation}
        newMoneyAmount={newMoneyAmount as string}
        setNewMoneyAmount={setNewMoneyAmount}
        sendNewMoney={sendNewMoney}
        setSign={setSign}
        sign={sign}
        totalValue={totalValue}
        setTotalValue={setTotalValue}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
})

export default React.memo(Body, isEqualMemoComparison)
