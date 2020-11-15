// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { Switch } from "react-native-paper"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import WhiteBlock from "../../../../../Components/WhiteBlock/WhiteBlock"
import LineItem from "./LineItem/LineItem"

import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null
  billType: string
  billEditData: any
  normalBillsListLength: number

  deleteBill: () => void
  // Normal / Cumulative
  accountBalance: string
  setAccountBalance: (newAccountBalance: string) => void
  creditLimit: string
  setCreditLimit: (newCreditLimit: string) => void
  takeIntoTotalBalance: boolean
  setTakeIntoTotalBalance: (takeIntoTotalBalanceStatus: boolean) => void

  // Cumulative
  goal: string
  setGoal: (newGoal: string) => void

  // Debt
  iOwe: string
  setIOwe: (iOweSum: string) => void
  totalDebtSum: string
  setTotalDebtSum: (totalDebtSum: string) => void
}

const BottomPart: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()
  const [popupTitle, setPopupTitle] = useState(null as string | null)
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [alertPopupVisible, setAlertPopupVisible] = useState(false as boolean)
  const [deletePopupVisible, setDeletePopupVisible] = useState(false as boolean)

  return (
    <>
      <WhiteBlock containerStyle={styles.container}>
        <Text style={styles.title}>{t("BillsScreen.Balance")}</Text>
        <LineItem
          title={
            props.billType === "DebtBill"
              ? t("CreateScreen.Body.IOwe")
              : t("CreateScreen.Body.AccountBalance")
          }
          onPress={() => {
            props.billType === "DebtBill"
              ? setPopupTitle("IOwe")
              : setPopupTitle("AccountBalance")

            setPopupVisible(true)
          }}
          action={
            <Text style={styles.action_text}>
              {renderPrice(
                props.billType === "DebtBill"
                  ? props.iOwe
                  : props.accountBalance,
                props.selectedCurrency,
                t
              )}
            </Text>
          }
        />
        <View style={styles.divider} />
        <LineItem
          title={
            props.billType === "DebtBill"
              ? t("CreateScreen.Body.TotalDebtSum")
              : props.billType === "SavingsBill"
              ? t("CreateScreen.Body.Goal")
              : t("CreateScreen.Body.CreditLimit")
          }
          onPress={() => {
            props.billType === "DebtBill"
              ? setPopupTitle("TotalDebtSum")
              : props.billType === "SavingsBill"
              ? setPopupTitle("Goal")
              : setPopupTitle("CreditLimit")

            setPopupVisible(true)
          }}
          action={
            <Text style={styles.action_text}>
              {renderPrice(
                props.billType === "DebtBill"
                  ? props.totalDebtSum
                  : props.billType === "SavingsBill"
                  ? props.goal
                  : props.creditLimit,
                props.selectedCurrency,
                t
              )}
            </Text>
          }
        />
        <View style={styles.divider} />
        <LineItem
          title={t("CreateScreen.Body.TakeInAccountInTotalBalance")}
          action={
            <Switch
              accessibilityStates
              color="#674ABE"
              value={props.takeIntoTotalBalance}
              onValueChange={() =>
                props.setTakeIntoTotalBalance(!props.takeIntoTotalBalance)
              }
            />
          }
        />
        <View style={styles.divider} />
        <LineItem
          title={t("CreateScreen.Body.DeleteBill")}
          icon={<FontAwesome name="trash-o" size={24} color="#FF0000" />}
          onPress={() =>
            props.normalBillsListLength > 1
              ? setDeletePopupVisible(true)
              : setAlertPopupVisible(true)
          }
        />
      </WhiteBlock>
      <InputPopup
        value={
          popupTitle === "AccountBalance"
            ? props.accountBalance
            : popupTitle === "CreditLimit"
            ? props.creditLimit
            : popupTitle === "TotalDebtSum"
            ? props.totalDebtSum
            : popupTitle === "IOwe"
            ? props.iOwe
            : popupTitle === "Goal"
            ? props.goal
            : undefined
        }
        onChangeFunction={
          popupTitle === "AccountBalance"
            ? props.setAccountBalance
            : popupTitle === "CreditLimit"
            ? props.setCreditLimit
            : popupTitle === "TotalDebtSum"
            ? props.setTotalDebtSum
            : popupTitle === "IOwe"
            ? props.setIOwe
            : popupTitle === "Goal"
            ? props.setGoal
            : undefined
        }
        title={t(`CreateScreen.Body.${popupTitle}`)}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        isNumberPad={
          popupTitle === "AccountBalance"
            ? true
            : popupTitle === "CreditLimit"
            ? true
            : popupTitle === "TotalDebtSum"
            ? true
            : popupTitle === "IOwe"
            ? true
            : popupTitle === "Goal"
            ? true
            : undefined
        }
      />

      <AlertPopup
        popupVisible={alertPopupVisible}
        setPopupVisible={setAlertPopupVisible}
        title={t("CreateScreen.Body.TitleDelAllBills")}
        content={<Text>{t("CreateScreen.Body.PPDelAllBills")}</Text>}
        removeCancelBtn
      />

      <AlertPopup
        popupVisible={deletePopupVisible}
        setPopupVisible={setDeletePopupVisible}
        title={t("CreateScreen.Body.TitleDeleteBill")}
        content={<Text>{t("CreateScreen.Body.PPDeleteBillVerify")}</Text>}
        function={props.deleteBill}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 15,
    borderBottomRightRadius: 20,
    marginTop: 20,
    elevation: 10,
  },

  title: {
    fontSize: 20,
    marginTop: 17,
    marginBottom: 13,
    color: "black",
  },

  action_text: {
    color: "#674ABE",
    fontSize: 16,
  },

  divider: {
    borderTopColor: "black",
    borderTopWidth: 1,
    opacity: 0.1,
    marginVertical: 12,
  },
})

export default React.memo(BottomPart, isEqualMemoComparison)
