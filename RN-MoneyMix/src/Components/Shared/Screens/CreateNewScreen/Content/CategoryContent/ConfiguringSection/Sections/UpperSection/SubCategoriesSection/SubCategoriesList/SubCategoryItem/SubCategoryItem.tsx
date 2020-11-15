// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SelectCetegoryIconPopup from "~/Components/Shared/Components/Popups/SelectCategoryIconPopup/SelectCategoryIconPopup"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { BorderlessButton } from "react-native-gesture-handler"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  category: any
  subCategory: any
  selectedCurrency: string

  popupData: any
  setPopupData: (newPopupData: any) => void
  setPopupVisible: (popupVisibility: boolean) => void

  subCategories: Array<any>
  setSubCategories: (newSubCategories: Array<any>) => void
  sendingSubCategories: Array<any>
  setSendingSubCategories: (newSendingSubCategories: Array<any>) => void
  deletingSubCategories: Array<any>
  setDeletingSubCategories: (newDeleteSubCategories: Array<any>) => void
  convertSubCategoryToCategoryThunkCreator: (
    currentCategory: any,
    convertingSubCategory: any,
    isIncome: boolean
  ) => void
}

const SubCategoryItem: React.FC<PropsType> = (props) => {
  const [title, setTitle] = useState(props.subCategory.title)
  const [editPopupVisible, setEditPopupVisible] = useState(false as boolean)
  const [iconsPopupVisible, setIconsPopupVisible] = useState(false as boolean)
  const [selectedIcon, setSelectedIcon] = useState(props.subCategory.icon)
  const [selectedColor, setSelectedColor] = useState(props.subCategory.color)
  const { t } = useTranslation()

  useEffect(() => {
    setTitle(props.subCategory.title)
    setSelectedIcon(props.subCategory.icon)
    setSelectedColor(props.subCategory.color)
  }, [props.subCategory])

  const FilteredArray = props.subCategories.filter(
    (obj: any) => obj.id !== props.subCategory.id
  )

  const filteredSendingSubCategories = props.sendingSubCategories.filter(
    (obj: any) => obj.id !== props.subCategory.id
  )

  const updateSubCategoryData = () => {
    props.setSubCategories([
      ...FilteredArray,
      {
        ...props.subCategory,
        title,
        color: selectedColor,
        icon: selectedIcon,
      },
    ])

    props.setSendingSubCategories([
      ...filteredSendingSubCategories,
      {
        ...props.subCategory,
        title,
        color: selectedColor,
        icon: selectedIcon,
        price: 0,
      },
    ])
  }

  useEffect(() => {
    !iconsPopupVisible && updateSubCategoryData()
  }, [iconsPopupVisible])

  useEffect(() => {
    !editPopupVisible && updateSubCategoryData()
  }, [editPopupVisible])

  return (
    <>
      <View style={styles.container}>
        <View style={styles.content_wrap}>
          <TouchableOpacity onPress={() => setIconsPopupVisible(true)}>
            <FontAwesome
              name={props.subCategory.icon}
              size={22}
              color={props.subCategory.color}
            />
          </TouchableOpacity>
          <Text style={[styles.title, { color: props.subCategory.color }]}>
            {props.subCategory.title}
          </Text>
        </View>
        <Text style={[styles.price, { color: props.subCategory.color }]}>
          {props.subCategory.price}{" "}
          {t(`DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`)}
        </Text>
        <View style={styles.icons_wrap}>
          <BorderlessButton onPress={() => setEditPopupVisible(true)}>
            <Feather name="edit-2" size={20} color="black" />
          </BorderlessButton>
          <BorderlessButton
            onPress={() => {
              props.setPopupData({
                title: t("CreateScreen.Body.ConvertSubCategory"),
                text: t("CreateScreen.Body.PPConvertSubCategory"),
                ID: "TRANSFORM",
                subCategory: props.subCategory,
              })
              props.setPopupVisible(true)
            }}
          >
            <FontAwesome5 name="redo" size={18} color="#674ABE" />
          </BorderlessButton>
          <BorderlessButton
            onPress={() => {
              props.setPopupData({
                title: t("CreateScreen.Body.DeleteSubCategory"),
                text: t("CreateScreen.Body.PPDeleteSubCategory"),
                ID: "DEL",
                subCategory: props.subCategory,
              })
              props.setPopupVisible(true)
            }}
          >
            <MaterialIcons name="delete" size={24} color="#FF0000" />
          </BorderlessButton>
        </View>
      </View>

      <SelectCetegoryIconPopup
        popupVisible={iconsPopupVisible}
        setPopupVisible={setIconsPopupVisible}
        selectedIcon={selectedIcon}
        setSelectedIcon={setSelectedIcon}
        selectedColor={selectedColor}
        setSelectedColor={setSelectedColor}
      />

      <InputPopup
        popupVisible={editPopupVisible}
        setPopupVisible={setEditPopupVisible}
        title={`${t("BillsScreen.EditBillPopup.Edit")} ${t(
          "CreateScreen.Body.SubCategory"
        ).toLocaleLowerCase()}`}
        value={title}
        onChangeFunction={(text: string) => setTitle(text)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 10,
    marginRight: 5,
  },

  content_wrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  text: {
    fontSize: 16,
  },

  title: {
    marginHorizontal: 15,
    fontSize: 16,
    width: 90,
  },

  price: {
    fontSize: 16,
  },

  icons_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "25%",
  },
})

export default SubCategoryItem
