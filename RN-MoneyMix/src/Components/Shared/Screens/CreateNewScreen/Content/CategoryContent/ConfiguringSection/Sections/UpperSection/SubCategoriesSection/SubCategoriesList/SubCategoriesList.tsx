// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SubCategoryItem from "./SubCategoryItem/SubCategoryItem"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  category: any
  selectedCurrency: string

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

const SubCategoriesList: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [popupData, setPopupData] = useState({
    title: null as string | null,
    text: null as string | null,
    ID: null as string | null,
    subCategory: null as any,
  })
  const { t } = useTranslation()

  return (
    <>
      <Text style={styles.title}>{t("CreateScreen.Body.SubCategory")}</Text>
      {props.subCategories.length > 0 && (
        <View style={styles.list_wrap}>
          {props.subCategories.map((subCategory: any) => {
            return (
              <SubCategoryItem
                navigation={props.navigation}
                isIncome={props.isIncome}
                category={props.category}
                subCategory={subCategory}
                subCategories={props.subCategories}
                setSubCategories={props.setSubCategories}
                sendingSubCategories={props.sendingSubCategories}
                setSendingSubCategories={props.setSendingSubCategories}
                popupData={popupData}
                setPopupData={setPopupData}
                setPopupVisible={setPopupVisible}
                selectedCurrency={props.selectedCurrency}
                deletingSubCategories={props.deletingSubCategories}
                setDeletingSubCategories={props.setDeletingSubCategories}
                convertSubCategoryToCategoryThunkCreator={
                  props.convertSubCategoryToCategoryThunkCreator
                }
              />
            )
          })}
        </View>
      )}

      <AlertPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        title={popupData.title}
        content={<Text>{popupData.text}</Text>}
        function={() => {
          const FilteredArray = props.subCategories.filter(
            (obj: any) => obj.id !== popupData.subCategory.id
          )

          setPopupVisible(false)
          if (popupData.ID === "TRANSFORM") {
            props.setSubCategories(FilteredArray)
            props.setDeletingSubCategories([
              ...props.deletingSubCategories,
              popupData.subCategory && popupData.subCategory.id,
            ])
            props.submitNewCategory(props.category.title)
            props.convertSubCategoryToCategoryThunkCreator(
              props.category,
              popupData.subCategory,
              props.isIncome
            )
            props.navigation.navigate("BottomTabNavigator")
          } else if (popupData.ID === "DEL") {
            props.setSubCategories(FilteredArray)
            props.setDeletingSubCategories([
              ...props.deletingSubCategories,
              popupData.subCategory && popupData.subCategory.id,
            ])
          }
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    marginBottom: 10,
    marginTop: -10,
    color: "black",
  },

  list_wrap: {
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
    marginHorizontal: -17,
    paddingHorizontal: 17,
    marginBottom: 18,
    paddingBottom: 10,
  },
})

export default React.memo(SubCategoriesList, isEqualMemoComparison)
