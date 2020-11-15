// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"
import {
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  operation: any

  setPopupVisible: (popupVisibility: boolean) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
}

const DateSection: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <View>
        <Text style={styles.date_text}>
          {t(
            `Operations.Popup.Days.${dayjs(props.operation.createdAt).format(
              "dddd"
            )}`
          ).toUpperCase()}
          ,{" "}
          {t(
            `Header.Months.${dayjs(props.operation.createdAt).format("MMMM")}`
          ).toUpperCase()}{" "}
          {t(dayjs(props.operation.createdAt).format("YYYY"))}{" "}
        </Text>
        {props.operation.comment && props.operation.comment.length > 0 ? (
          <TouchableOpacity
            style={styles.comment_text}
            onPress={() => setPopupVisible(true)}
          >
            <Text>{sliceString(props.operation.comment, 52)}</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.comment_template}
            onPress={() => setPopupVisible(true)}
          >
            <AntDesign name="plus" size={17} color="white" />
            <Text style={styles.comment_template_text}>
              {t("Operations.Popup.AddComment")}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <InputPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        title={t("MoneyCategoriesTransferScreen.TopSection.YourComment")}
        value={props.operation.comment}
        onChangeFunction={(value: string) =>
          props.addOperationCommentThunkCreator(props.operation, value)
        }
        saveFunction={() => props.setPopupVisible(false)}
      />
    </>
  )
}

const styles = StyleSheet.create({
  date_text: {
    opacity: 0.6,
    fontSize: 14,
  },

  comment_text: {
    marginTop: 7,
    width: 160,
  },

  comment_template: {
    backgroundColor: "#674ABE",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    justifyContent: "space-evenly",
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 7,
  },

  comment_template_text: {
    color: "white",
    fontSize: 13,
    marginLeft: 5,
  },
})

export default React.memo(DateSection, isEqualMemoComparison)
