// PLUGINS IMPORTS //
import React from "react"
import {
  View,
  TouchableOpacity,
  Text,
  Keyboard,
  StyleSheet,
} from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SubCategoriesSection from "./SubCategoriesSection/SubCategoriesSection"
import WhiteBlock from "../../../../../../../Components/WhiteBlock/WhiteBlock"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  selectedCurrency: string

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
    subCategories: Array<any>
    archived: boolean
  }

  setPopupVisible: (popupVisibility: boolean) => void

  selectedIcon: string | null
  selectedColor: string
  subCategories: Array<any>
  setSubCategories: (newSubCategories: Array<any>) => void
  sendingSubCategories: Array<any>
  setSendingSubCategories: (newSendingSubCategories: Array<any>) => void
  deletingSubCategories: Array<any>
  setDeletingSubCategories: (newDeleteSubCategories: Array<any>) => void
  submitNewCategory: (title: string) => void
  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
}

const UpperSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <WhiteBlock containerStyle={styles.container}>
      <TouchableOpacity
        style={[
          styles.icon,
          props.category
            ? { backgroundColor: props.selectedColor }
            : { backgroundColor: props.selectedColor },
        ]}
        onPress={() => {
          Keyboard.dismiss()
          props.setPopupVisible(true)
        }}
      >
        {props.category && props.selectedColor ? (
          <FontAwesome
            name={props.selectedIcon as string}
            size={24}
            color={"white"}
          />
        ) : (
          <FontAwesome
            name={props.selectedIcon as string}
            size={24}
            color={"white"}
          />
        )}
      </TouchableOpacity>
      <Text style={styles.title}>{t("CreateScreen.Body.Settings")}</Text>
      <View style={styles.block_wrap}>
        <Text style={styles.bold}>
          {t("CreateScreen.Body.CategoryCurrency")}
        </Text>
        <Text style={[styles.bold, { color: "#674ABE", marginTop: 1 }]}>
          {t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}`)} -{" "}
          {t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`)}
        </Text>
      </View>
      <SubCategoriesSection
        navigation={props.navigation}
        isIncome={props.isIncome}
        category={props.category}
        subCategories={props.subCategories}
        setSubCategories={props.setSubCategories}
        sendingSubCategories={props.sendingSubCategories}
        setSendingSubCategories={props.setSendingSubCategories}
        selectedCurrency={props.selectedCurrency}
        deletingSubCategories={props.deletingSubCategories}
        setDeletingSubCategories={props.setDeletingSubCategories}
        submitNewCategory={props.submitNewCategory}
        convertSubCategoryToCategoryThunkCreator={
          props.convertSubCategoryToCategoryThunkCreator
        }
      />
    </WhiteBlock>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingVertical: 20,
  },

  title: {
    fontSize: 19,
    marginBottom: 7,
    color: "black",
  },

  bold: {
    fontWeight: "bold",
    color: "black",
  },

  icon: {
    position: "absolute",
    borderColor: "#674ABE",
    borderWidth: 2,
    borderRadius: 7,
    height: 46,
    width: 46,
    alignItems: "center",
    justifyContent: "center",
    right: 35,
    top: -21,
  },

  block_wrap: {
    marginBottom: 24,
  },
})

export default React.memo(UpperSection, isEqualMemoComparison)
