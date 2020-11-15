// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import SecondLine from "./SecondLine/SecondLine"
import NumberPad from "./NumberPad/NumberPad"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isAuthentificated: boolean
  isOnline: boolean
  isIncome: boolean
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  selectedCategory: any
  selectedBill: any

  selectedSubCategory: any
  selectedCurrency: string | null

  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => any
}

const CalculatorSection: React.FC<PropsType> = (props) => {
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const [moneyAmount, setMoneyAmount] = useState(0 as number)
  const [newMoneyAmount, setNewMoneyAmount] = useState("" as string)
  const [comment, setComment] = useState("" as string)
  const [sign, setSign] = useState(null as any)
  const [totalValue, setTotalValue] = useState("" as string)
  const [selectedDate, setSelectedDate] = useState(
    new Date(dayjs() as any) as Date
  )
  const { t } = useTranslation()

  useEffect(() => {
    setMoneyAmount(props.selectedCategory.price || "")
  }, [])

  useEffect(() => {
    setMoneyAmount(props.selectedCategory.price || "")
  }, [props.selectedCategory])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setMoneyAmount(props.selectedCategory.price)
      setComment("")
    })

    props.navigation.addListener("blur", () => {
      setMoneyAmount(0)
      setNewMoneyAmount("")
      setSign(null)
      setTotalValue("")
      setSelectedImages([])
      setSelectedDate(new Date(dayjs() as any))
    })
  }, [props.navigation])

  const [selectedImages, setSelectedImages] = useState([] as Array<any>)

  useEffect(() => {
    const getData = async () => {
      const data = await props.route.params.transData
      if (data) {
        setSelectedImages(data.selectedImages || [])
        setComment(data.comment || "")
        setTotalValue(data.moneyAmount || "")
      }
    }

    getData()
  }, [props.route.params.transData])

  const sendNewMoney = async () => {
    if (Number(totalValue) > 0) {
      props.CategoryMoneyTransferThunkCreator(
        props.isIncome,
        props.selectedCategory,
        props.selectedSubCategory,
        props.selectedBill,
        totalValue,
        comment,
        selectedImages,
        selectedDate as any
      )
      props.navigation.navigate("BottomTabNavigator")
    } else {
      setAlertPopupVisible(true)
    }
  }

  return (
    <>
      <View style={styles.container}>
        <SecondLine
          navigation={props.navigation}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          storageData={props.storageData}
          //
          moneyAmount={moneyAmount as number}
          newMoneyAmount={newMoneyAmount}
          totalValue={totalValue}
          isIncome={props.isIncome}
          comment={comment}
          setComment={setComment}
          sign={sign}
          selectedCurrency={props.selectedCurrency}
          selectedImages={selectedImages}
          setSelectedImages={setSelectedImages}
          selectedDate={selectedDate}
          selectedCategory={props.selectedCategory}
          selectedBill={props.selectedBill}
        />
        <NumberPad
          navigation={props.navigation}
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          //
          newMoneyAmount={newMoneyAmount as string}
          setNewMoneyAmount={setNewMoneyAmount}
          isIncome={props.isIncome}
          sendNewMoney={sendNewMoney}
          setSign={setSign}
          sign={sign}
          totalValue={totalValue}
          setTotalValue={setTotalValue}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      </View>
      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t(
          "MoneyCategoriesTransferScreen.Popups.OperationSubmissionError"
        )}
        content={
          <Text style={styles.text}>
            {`${t("MoneyCategoriesTransferScreen.Popups.PPAlertEmptySum")}!`}
          </Text>
        }
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 3,
  },

  text: {
    color: "black",
    fontSize: 16,
  },
})

export default CalculatorSection
