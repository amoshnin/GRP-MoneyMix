// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { Text } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import UpperPart from "./UpperPart/UpperPart"
import BottomPart from "./BottomPart/BottomPart"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import {
  renderBillName,
  concat,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  billType: string
  name: string
  uploadBillData: boolean
  billEditData: any

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  SubmitNewBillThunkCreator: (
    billEditData: any,
    billType: string,

    billData: {
      name: string
      description: string
      accountBalance: string
      creditLimit: string
      takeIntoTotalBalance: boolean
      iOwe: string
      goal: string
      totalDebtSum: string
      icon: string
    },

    BillsArraysData: {
      normalBillsList: Array<any>
      savingsBillsList: Array<any>
      debtsBillsList: Array<any>
    }
  ) => void
  setUploadBillData: (uploadBillStatus: boolean) => void
  DeleteBillThunkCreator: (
    billType: string,
    billEditData: any,
    accountBalance: string,
    totalDebtSum: string,
    iOwe: string,
    normalBillsList: Array<any>,
    debtsBillsList: Array<any>,
    savingsBillsList: Array<any>
  ) => void
}

const BillsContent: React.FC<PropsType> = (props) => {
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const isEdit = Object.values(props.billEditData).length > 0
  const { t } = useTranslation()

  const [selectedIcon, setSelectedIcon] = useState(
    props.billEditData.icon || (null as string | null)
  )

  // Normal / Cumulative
  const [description, setDescription] = useState(
    props.billEditData.description as string | null
  )
  let [accountBalance, setAccountBalance] = useState(
    props.billEditData.accountBalance || 0
  )
  const [creditLimit, setCreditLimit] = useState(
    props.billEditData.creditLimit || (null as string | null)
  )
  let [takeIntoTotalBalance, setTakeIntoTotalBalance] = useState(
    isEdit ? props.billEditData.takeIntoTotalBalance || false : true
  )

  // Cumulative
  const [goal, setGoal] = useState(
    props.billEditData.goal || (null as string | null | null)
  )

  // Debt
  const [iOwe, setIOwe] = useState(
    props.billEditData.iOwe || (null as string | null)
  )
  const [totalDebtSum, setTotalDebtSum] = useState(
    props.billEditData.totalDebtSum || (null as string | null)
  )

  useEffect(() => {
    setSelectedIcon(props.billEditData.icon as string | boolean)
    setDescription(props.billEditData.description as string | null)
    setAccountBalance(props.billEditData.accountBalance || 0)
    setCreditLimit(props.billEditData.creditLimit || 0)
    setTakeIntoTotalBalance(
      isEdit ? props.billEditData.takeIntoTotalBalance || false : true
    )
    setGoal(props.billEditData.goal || 0)
    setIOwe(props.billEditData.iOwe || 0)
    setTotalDebtSum(props.billEditData.totalDebtSum || 0)
  }, [props.billEditData])

  useEffect(() => {
    if (props.uploadBillData) {
      CreateNewBill()
    }
  }, [props.uploadBillData])

  const CreateNewBill = () => {
    const billsNames = [
      ...concat(
        props.normalBillsList,
        props.debtsBillsList,
        props.savingsBillsList
      ).map((bill: any) => renderBillName(bill.name, t)),
      ...concat(
        props.normalBillsList,
        props.debtsBillsList,
        props.savingsBillsList
      ).map((bill: any) => bill.name),
    ]

    if (
      props.billEditData.name
        ? renderBillName(props.billEditData.name, t).trim().toLowerCase() !==
          props.name.trim().toLowerCase()
        : true
    ) {
      if (
        billsNames.findIndex(
          (item) =>
            props.name.trim().toLowerCase() === item.trim().toLowerCase()
        ) > -1
      ) {
        props.setUploadBillData(false)
        setAlertPopupVisible(true)
      } else {
        props.SubmitNewBillThunkCreator(
          props.billEditData,
          props.billType,
          {
            name: props.name as string,
            accountBalance: accountBalance,
            creditLimit: creditLimit,
            description: description as string,
            goal: goal,
            iOwe: iOwe,
            takeIntoTotalBalance: takeIntoTotalBalance,
            totalDebtSum: totalDebtSum,
            icon: selectedIcon,
          },
          {
            normalBillsList: props.normalBillsList,
            savingsBillsList: props.savingsBillsList,
            debtsBillsList: props.debtsBillsList,
          }
        )
        props.navigation.goBack()
        props.setUploadBillData(false)
      }
    } else {
      props.SubmitNewBillThunkCreator(
        props.billEditData,
        props.billType,
        {
          name: props.name as string,
          accountBalance: accountBalance,
          creditLimit: creditLimit,
          description: description as string,
          goal: goal,
          iOwe: iOwe,
          takeIntoTotalBalance: takeIntoTotalBalance,
          totalDebtSum: totalDebtSum,
          icon: selectedIcon,
        },
        {
          normalBillsList: props.normalBillsList,
          savingsBillsList: props.savingsBillsList,
          debtsBillsList: props.debtsBillsList,
        }
      )
      props.navigation.goBack()
      props.setUploadBillData(false)
    }
  }

  const deleteBill = async () => {
    props.DeleteBillThunkCreator(
      props.billType,
      props.billEditData,
      accountBalance,
      totalDebtSum,
      iOwe,
      props.normalBillsList,
      props.debtsBillsList,
      props.savingsBillsList
    )
    props.navigation.navigate("BottomTabNavigator")
  }

  const normalBillsListLength =
    props.normalBillsList && props.normalBillsList.length

  return (
    <>
      <UpperPart
        navigation={props.navigation}
        billType={props.billType}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        description={description as string}
        setDescription={setDescription}
      />
      <BottomPart
        navigation={props.navigation}
        selectedCurrency={props.selectedCurrency}
        billType={props.billType}
        billEditData={props.billEditData}
        deleteBill={deleteBill}
        // Normal / Cumulative
        accountBalance={accountBalance}
        setAccountBalance={setAccountBalance}
        creditLimit={creditLimit as string}
        setCreditLimit={setCreditLimit}
        takeIntoTotalBalance={takeIntoTotalBalance}
        setTakeIntoTotalBalance={setTakeIntoTotalBalance}
        // Cumulative
        goal={goal as string}
        setGoal={setGoal}
        // Debt
        iOwe={iOwe}
        setIOwe={setIOwe}
        totalDebtSum={totalDebtSum}
        setTotalDebtSum={setTotalDebtSum}
        normalBillsListLength={normalBillsListLength}
      />

      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t("PremiumVersionScreen.Popups.TitleBillCreateError")}
        content={
          <Text>{t("PremiumVersionScreen.Popups.PPBillCreateError")}</Text>
        }
        removeCancelBtn
      />
    </>
  )
}

export default React.memo(BillsContent, isEqualMemoComparison)
