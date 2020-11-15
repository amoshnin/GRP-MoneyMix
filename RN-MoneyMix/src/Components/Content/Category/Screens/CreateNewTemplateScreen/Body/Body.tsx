// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View } from "react-native"

// COMPONENTS IMPORTS //
import SecondLine from "./CalculatorSections/SecondLine/SecondLine"
import NumberPad from "~/Components/Shared/Screens/MoneyTransfers/MoneyCategoriesTransferScreen/Body/CalculatorSection/NumberPad/NumberPad"

import SubCategoriesList from "~/Components/Shared/Screens/MoneyTransfers/Shared/Sections/SubCategoriesList/SubCategoriesList"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isOnline: boolean
  isAuthentificated: boolean
  selectedCurrency: string | null
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  isIncome: boolean
  selectedCategory: any
  selectedBill: any

  sendMoney: () => void

  totalValue: string
  setTotalValue: (newTotalValue: string) => void
  selectedImages: Array<any>
  setSelectedImages: (newSelectedImages: Array<any>) => void
  comment: string
  setComment: (newComment: string) => void
  selectedSubCategory: any
  setSelectedSubCategory: (newSelectedSubCategory: any) => void
}

const Body: React.FC<PropsType> = (props) => {
  const [moneyAmount, setMoneyAmount] = useState(0 as number)
  const [newMoneyAmount, setNewMoneyAmount] = useState("" as string)
  const [sign, setSign] = useState(null as any)

  useEffect(() => {
    setMoneyAmount(props.selectedCategory.price || "")
  }, [])

  useEffect(() => {
    setMoneyAmount(props.selectedCategory.price || "")
  }, [props.selectedCategory])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setMoneyAmount(props.selectedCategory.price)
      props.setComment("")
    })

    props.navigation.addListener("blur", () => {
      setMoneyAmount(0)
      setNewMoneyAmount("")
      setSign(null)
      props.setTotalValue("")
      props.setSelectedImages([])
    })
  }, [props.navigation])

  return (
    <View>
      <SubCategoriesList
        subCategoriesList={props.selectedCategory.subCategories}
        selectedSubCategory={props.selectedSubCategory}
        setSelectedSubCategory={props.setSelectedSubCategory}
      />
      <SecondLine
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        storageData={props.storageData}
        moneyAmount={moneyAmount as number}
        newMoneyAmount={newMoneyAmount}
        totalValue={props.totalValue}
        isIncome={props.isIncome}
        comment={props.comment}
        setComment={props.setComment}
        sign={sign}
        selectedCurrency={props.selectedCurrency}
        selectedImages={props.selectedImages}
        setSelectedImages={props.setSelectedImages}
        selectedCategory={props.selectedCategory}
        selectedBill={props.selectedBill}
      />
      <NumberPad
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        newMoneyAmount={newMoneyAmount as string}
        setNewMoneyAmount={setNewMoneyAmount}
        isIncome={props.isIncome}
        setSign={setSign}
        sign={sign}
        totalValue={props.totalValue}
        setTotalValue={props.setTotalValue}
        selectedDate={"" as any}
        setSelectedDate={() => {}}
        sendNewMoney={props.sendMoney}
        removeDateSelection
      />
    </View>
  )
}

export default React.memo(Body, isEqualMemoComparison)
