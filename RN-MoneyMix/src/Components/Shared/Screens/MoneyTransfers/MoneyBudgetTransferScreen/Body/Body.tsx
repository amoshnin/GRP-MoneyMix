// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"

// COMPONENTS IMPORTS //
import FirstLine from "./CalculatorSections/FirstLine/FirstLine"
import NumberPad from "./CalculatorSections/NumberPad/NumberPad"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  data: any
  isIncome: boolean
  isSavingsBill: boolean
  selectedCurrency: string | null

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

const Body: React.FC<PropsType> = (props) => {
  let [newBudgetAmount, setNewBudgetAmount] = useState("" as string)

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      Number(props.data.budget) > 0 &&
        setNewBudgetAmount(String(props.data.budget))
    })
    props.navigation.addListener("blur", () => {
      setNewBudgetAmount("")
    })
  }, [props.navigation])

  const sendNewMoney = async () => {
    props.isSavingsBill
      ? props.addCertainSavingBillBudgetThunkCreator(
          props.data,
          Number(newBudgetAmount)
        )
      : props.addCertainCategoryBudgetThunkCreator(
          props.data,
          props.isIncome,
          newBudgetAmount
        )
    props.navigation.navigate("BottomTabNavigator")
  }

  return (
    <>
      <FirstLine
        newBudgetAmount={newBudgetAmount}
        selectedCurrency={props.selectedCurrency}
      />
      <NumberPad
        navigation={props.navigation}
        sendNewMoney={sendNewMoney}
        newBudgetAmount={newBudgetAmount as string}
        setNewBudgetAmount={setNewBudgetAmount}
      />
    </>
  )
}

export default React.memo(Body, isEqualMemoComparison)
