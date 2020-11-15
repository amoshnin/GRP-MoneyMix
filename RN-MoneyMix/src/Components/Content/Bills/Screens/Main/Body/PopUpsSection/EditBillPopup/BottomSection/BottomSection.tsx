// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialCommunityIcons } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  billData: any
  billType: string | null

  popupVisible: boolean
  setPopupVisible: (editPopupVisiblityStatus: boolean) => void
  setTransferInitalNav: (transferInitalNav: string) => void
  setDisableExitApp: (disableExitAppStatus: boolean) => void

  transferScreensPopupVisible: boolean
  setTransferScreensPopupVisible: (
    transferScreensPopupVisibility: boolean
  ) => void
}

const BottomSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <RoundButton
        title={t("BillsScreen.EditBillPopup.Edit")}
        onPress={() => {
          props.setDisableExitApp(true)
          props.navigation.navigate("CreateNewScreen", {
            billType: props.billType,
            billEditData: props.billData,
          })
          props.setPopupVisible(false)
        }}
        backgroundColor="#45C9FF"
        containerStyle={styles.button}
      >
        <MaterialCommunityIcons name="pencil" size={24} color="black" />
      </RoundButton>

      <RoundButton
        title={t("BillsScreen.EditBillPopup.Balance")}
        backgroundColor="#86BAF8"
        containerStyle={styles.button}
        onPress={() => {
          props.setDisableExitApp(true)
          props.navigation.navigate("MoneyBillsRefillBalanceScreen", {
            billData: props.billData,
          })
          props.setPopupVisible(false)
        }}
      >
        <FontAwesome name="refresh" size={24} color="black" />
      </RoundButton>

      <RoundButton
        containerStyle={styles.button}
        title={t("BillsScreen.EditBillPopup.Operations")}
        backgroundColor="#DAE9FF"
        onPress={() => {
          props.setDisableExitApp(true)
          props.navigation.navigate("Operations", {
            bill: {
              title: props.billData.name,
              icon: props.billData.icon,
              price: props.billData.accountBalance || props.billData.iOwe || 0,
              type: props.billData.type,
            },
          })
          props.setPopupVisible(false)
        }}
      >
        <MaterialCommunityIcons
          name="file-document-edit-outline"
          size={24}
          color="black"
        />
      </RoundButton>

      <RoundButton
        containerStyle={styles.button}
        title={t("BillsScreen.EditBillPopup.Replenish")}
        backgroundColor="#01CA5C"
        onPress={() => {
          props.setTransferInitalNav("ReplenishScreen")
          props.setDisableExitApp(true)
          props.setPopupVisible(false)
          props.setTransferScreensPopupVisible(true)
        }}
      >
        <AntDesign name="arrowdown" size={24} color="black" />
      </RoundButton>

      <RoundButton
        containerStyle={styles.button}
        title={t("BillsScreen.EditBillPopup.Withdrawl")}
        backgroundColor="#FF555B"
        onPress={() => {
          props.setTransferInitalNav("WithdrawlScreen")
          props.setDisableExitApp(true)
          props.setPopupVisible(false)
          props.setTransferScreensPopupVisible(true)
        }}
      >
        <AntDesign name="arrowup" size={24} color="black" />
      </RoundButton>

      <RoundButton
        containerStyle={styles.button}
        title={t("BillsScreen.EditBillPopup.Transfer")}
        backgroundColor="#FFA423"
        onPress={() => {
          props.setTransferInitalNav("TransferScreen")
          props.setDisableExitApp(true)
          props.setPopupVisible(false)
          props.setTransferScreensPopupVisible(true)
        }}
      >
        <AntDesign name="arrowright" size={24} color="black" />
      </RoundButton>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 9,
    flexDirection: "row",
    flexWrap: "wrap",
    width: 300,
    alignSelf: "center",
    justifyContent: "center",
  },

  button: {
    marginVertical: 13,
    marginBottom: 10,
    marginHorizontal: 22,
  },
})

export default React.memo(BottomSection, isEqualMemoComparison)
