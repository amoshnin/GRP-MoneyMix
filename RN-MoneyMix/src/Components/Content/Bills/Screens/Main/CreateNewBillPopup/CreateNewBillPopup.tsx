// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  popupVisible: boolean
}

const CreateNewBillPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <TitledPopup
      popupVisible={props.popupVisible}
      setPopupVisible={(popupVisibility: boolean) => {
        props.navigation.setParams({
          createNewBillPopupVisible: popupVisibility,
        })
      }}
      title={t("BillsScreen.CreateNewBillPopup.CreateBill")}
      wrapperStyle={styles.wrapper}
    >
      <View style={styles.content}>
        <Button
          title={t("BillsScreen.CreateNewBillPopup.NormalBill")}
          content={t("BillsScreen.CreateNewBillPopup.Cash_Card")}
          onPress={() => {
            props.navigation.setParams({
              createNewBillPopupVisible: false,
            })
            props.navigation.navigate("CreateNewScreen", {
              title: "CreateNewBill",
              billType: "NormalBill",
            })
          }}
          icon={<FontAwesome name="dollar" size={24} color="#674ABE" />}
          containerStyle={styles.button}
          textStyle={styles.button_text}
          contentTextStyle={styles.button_content_text}
        />
        <Button
          title={t("BillsScreen.CreateNewBillPopup.DebtBill")}
          content={t("BillsScreen.CreateNewBillPopup.Credit_Mortgage")}
          onPress={() => {
            props.navigation.setParams({
              createNewBillPopupVisible: false,
            })
            props.navigation.navigate("CreateNewScreen", {
              billType: "DebtBill",
            })
          }}
          icon={
            <MaterialCommunityIcons name="bank" size={24} color="#674ABE" />
          }
          containerStyle={styles.button}
          textStyle={styles.button_text}
          contentTextStyle={styles.button_content_text}
        />
        <Button
          title={t("BillsScreen.CreateNewBillPopup.SavingsBill")}
          content={t("BillsScreen.CreateNewBillPopup.Savings_Goal")}
          onPress={() => {
            props.navigation.setParams({
              createNewBillPopupVisible: false,
            })
            props.navigation.navigate("CreateNewScreen", {
              title: "CreateNewBill",
              billType: "SavingsBill",
            })
          }}
          icon={<AntDesign name="creditcard" size={24} color="#674ABE" />}
          containerStyle={styles.button}
          textStyle={styles.button_text}
          contentTextStyle={styles.button_content_text}
          unSliceTitle
        />
      </View>
    </TitledPopup>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 310,
    marginHorizontal: -19,
    backgroundColor: "#F1F1F1",
  },

  content: {
    marginTop: 13,
    marginHorizontal: 10,
  },

  button: {
    marginVertical: 11,
    justifyContent: "space-between",
    width: "100%",
  },

  button_text: {
    fontSize: 15,
  },

  button_content_text: {
    opacity: 0.5,
    fontSize: 13,
  },
})

export default React.memo(CreateNewBillPopup, isEqualMemoComparison)
