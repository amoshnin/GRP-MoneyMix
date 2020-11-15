// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  category: any
  billData: any
  showGraphicsField?: boolean

  setPopupVisible: (popupVisibilityStatus: boolean) => void
  setSelectedCategory?: (newSelectedCategory: any) => void
  setDisableExitApp: (disableExitAppStatus: boolean) => void
}

const Footer: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      {props.isIncome ? (
        <RoundButton
          title={t("Categories.Main.Income")}
          backgroundColor={"#01CA5C"}
          onPress={() => {
            props.navigation.navigate("MoneyCategoriesTransferScreen", {
              isIncome: true,
              categoryData: props.category,
              billData: props.billData,
            })
            props.setDisableExitApp(true)
            props.setPopupVisible(false)
          }}
        >
          <AntDesign name="arrowup" size={24} color="black" />
        </RoundButton>
      ) : (
        <RoundButton
          title={t("Categories.Main.Expenses")}
          backgroundColor={"#FF555B"}
          onPress={() => {
            props.navigation.navigate("MoneyCategoriesTransferScreen", {
              isIncome: false,
              categoryData: props.category,
            })
            props.setDisableExitApp(true)
            props.setPopupVisible(false)
          }}
        >
          <AntDesign name="arrowdown" size={24} color="black" />
        </RoundButton>
      )}
      <RoundButton
        title={t("BillsScreen.EditBillPopup.Operations")}
        backgroundColor={"#DAE9FF"}
        onPress={() => {
          props.setDisableExitApp(true)
          props.setPopupVisible(false)
          props.navigation.navigate("Operations", {
            category: props.category,
          })
        }}
      >
        <MaterialCommunityIcons
          name="file-document-edit-outline"
          size={24}
          color="black"
        />
      </RoundButton>
      {props.showGraphicsField && (
        <RoundButton
          title={t("BillsScreen.EditBillPopup.Graphic")}
          backgroundColor={"#45C9FF"}
          onPress={() => {
            props.setSelectedCategory &&
              props.setSelectedCategory(props.category)
            props.setDisableExitApp(true)
            props.setPopupVisible(false)
          }}
        >
          <Entypo name="bar-graph" size={24} color="black" />
        </RoundButton>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 30,
  },
})

export default React.memo(Footer, isEqualMemoComparison)
