// PLUGINS IMPORTS //
import React, { useState } from "react"
import { TouchableOpacity, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  category: {
    title: string
    icon: string
    color: string
    price: string
    budget: string
    type: string
    id: string
  }

  deleteCategoryThunkCreator: (categoryID: string) => void
}

const DeleteIcon: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <TouchableOpacity
        style={styles.icon}
        onPress={() => setPopupVisible(true)}
      >
        <AntDesign name="delete" size={24} color="white" />
      </TouchableOpacity>

      <AlertPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        title={t("CreateScreen.Body.TitleDeleteCategory")}
        content={<Text>{t("CreateScreen.Body.PPDeleteCategoryVerify")}</Text>}
        function={() => {
          props.deleteCategoryThunkCreator(props.category && props.category.id)
          props.navigation.goBack()
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  icon: {
    backgroundColor: "#DB4437",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(DeleteIcon, isEqualMemoComparison)
