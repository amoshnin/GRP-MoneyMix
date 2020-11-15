// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import {
  renderPrice,
  renderBillName,
  renderBillIcon,
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import { Entypo } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedCurrency: string | null
  template: {
    templateTitle: string
    isIncome: boolean
    category: any
    bill: any
    newMoneyAmount: number | string
    comment: string
    selectedImages: Array<any>
    selectedDate: Date | string | null
    selectedSubCategory: any
    ID: string
  }

  deleteTemplateThunkCreator: (template: any) => void
  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => void
}

const TemplatesScreen: React.FC<PropsType> = (props) => {
  const [deletePopupVisible, setDeletePopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <TouchableOpacity
        style={styles.wrapper}
        onLongPress={() => setDeletePopupVisible(true)}
        onPress={() => {
          props.navigation.goBack()
          props.CategoryMoneyTransferThunkCreator(
            props.template.isIncome,
            props.template.category,
            props.template.selectedSubCategory,
            props.template.bill,
            String(props.template.newMoneyAmount),
            props.template.comment,
            props.template.selectedImages,
            new Date(dayjs() as any) as any
          )
        }}
      >
        <View style={styles.container}>
          <RoundButton
            backgroundColor={"#674ABE"}
            topText={renderBillName(props.template.bill.name, t)}
          >
            {renderBillIcon(
              props.template.bill.type,
              props.template.bill.icon,
              "white"
            )}
          </RoundButton>
          <View style={styles.text_wrap}>
            <Entypo name="arrow-with-circle-right" size={24} color="#674ABE" />

            <Text
              style={[
                styles.price,
                props.template.isIncome
                  ? { color: "#01CA5C" }
                  : { color: "#FF555B" },
              ]}
            >
              {props.template.isIncome ? "+" : "-"}
              {renderPrice(
                props.template.newMoneyAmount,
                props.selectedCurrency,
                t
              )}
            </Text>
          </View>
          <RoundButton
            backgroundColor={props.template.category.color}
            topText={renderCategoryTitle(props.template.category.title, t)}
          >
            <FontAwesome
              name={props.template.category.icon}
              size={24}
              color={"white"}
            />
          </RoundButton>
        </View>
        <View style={[styles.line_wrap, { height: 36 }]}>
          <Text style={styles.title}>{props.template.templateTitle}</Text>
          <Text style={styles.comment}>{props.template.comment}</Text>
        </View>
      </TouchableOpacity>

      <AlertPopup
        popupVisible={deletePopupVisible}
        setPopupVisible={setDeletePopupVisible}
        content={<Text>{t("Categories.Templates.PPDeleteTemplate")}</Text>}
        confirmButtonText={t("Operations.Popup.Delete")}
        function={() => props.deleteTemplateThunkCreator(props.template)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 10,
    borderRadius: 20,
    backgroundColor: "white",
    marginHorizontal: 15,
    justifyContent: "center",
  },

  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 9,
    marginHorizontal: 7,
  },

  text_wrap: {
    alignItems: "center",
  },

  price: {
    fontWeight: "bold",
    fontSize: 20,
    marginRight: 7,
    marginTop: 4,
  },

  line_wrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    borderTopWidth: 0.7,
    borderTopColor: "silver",
    paddingTop: 8,
    marginBottom: 7,
  },

  comment: {
    opacity: 0.5,
    fontStyle: "italic",
  },

  title: {
    fontSize: 16,
  },
})

export default React.memo(TemplatesScreen, isEqualMemoComparison)
