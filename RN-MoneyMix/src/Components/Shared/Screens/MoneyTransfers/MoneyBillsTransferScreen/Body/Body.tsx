// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import SecondLine from "./CalculatorSections/SecondLine/SecondLine"
import NumberPad from "./CalculatorSections/NumberPad/NumberPad"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
  isAuthentificated: boolean
  selectedCurrency: string | null
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  firstBillData: any
  setFirstBillData: (newFistBillData: any) => void
  sendingBillData: any
  setSendingBillData: (newSendingBillData: any) => void

  BillsMoneyTransferThunkCreator: (
    firstBillData: any,
    sendingBillData: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: Date
  ) => any
  getBillsListsThunkCreator: () => void
}

const Body: React.FC<PropsType> = (props) => {
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const [newMoneyAmount, setNewMoneyAmount] = useState("" as string)
  const [comment, setComment] = useState("" as string)
  const [selectedImages, setSelectedImages] = useState([] as Array<any>)
  const [selectedDate, setSelectedDate] = useState(new Date(dayjs() as any))
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      if (props.route.params.transData) {
        const data = await props.route.params.transData
        setSelectedImages(data.selectedImages || [])
        setComment(data.comment || "")
        setNewMoneyAmount(data.moneyAmount || "")
      }
    }

    getData()
  }, [props.route.params.transData])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      setComment("")
    })

    props.navigation.addListener("blur", () => {
      setNewMoneyAmount("")
      setSelectedImages([])
      setSelectedDate(new Date(dayjs() as any))
    })
  }, [props.navigation])

  const sendNewMoney = async () => {
    if (Number(newMoneyAmount) > 0) {
      props
        .BillsMoneyTransferThunkCreator(
          props.firstBillData,
          props.sendingBillData,
          newMoneyAmount,
          comment,
          selectedImages,
          selectedDate
        )
        .then(() => {
          props.getBillsListsThunkCreator()
        })

      props.navigation.navigate("BottomTabNavigator")
    } else {
      setAlertPopupVisible(true)
    }
  }

  return (
    <View>
      <SecondLine
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        storageData={props.storageData}
        //
        newMoneyAmount={newMoneyAmount}
        comment={comment}
        setComment={setComment}
        selectedCurrency={props.selectedCurrency}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        selectedDate={selectedDate}
        firstBillData={props.firstBillData}
        sendingBillData={props.sendingBillData}
      />
      <NumberPad
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        sendNewMoney={sendNewMoney}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        newMoneyAmount={newMoneyAmount as string}
        setNewMoneyAmount={setNewMoneyAmount}
      />
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
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "black",
    fontSize: 16,
  },
})

export default React.memo(Body, isEqualMemoComparison)
