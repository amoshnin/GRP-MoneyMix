// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import AddBlockItem from "./AddBlockItem/AddBlockItem"
import InputPopup from "~/Components/Shared/Components/Popups/InputPopup/InputPopup"

import { capitalize } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"
import { FontAwesome } from "@expo/vector-icons"
import { RectButton } from "react-native-gesture-handler"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title: string
  isIncome: boolean

  keywordsList: Array<{
    ID: string
    text: string
  }>

  addBankSmsKeywordThunkCreator: (
    keywordText: string,
    isIncome: boolean
  ) => void
  editBankSmsKeywordThunkCreator: (
    oldKeywordObj: any,
    editedKeywordText: string,
    isIncome: boolean
  ) => void
  deleteBankSmsKeywordThunkCreator: (
    oldKeywordObj: any,
    isIncome: boolean
  ) => void
}

const SectionItem: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)

  const [oldKeywordObj, setOldKeywordObj] = useState({
    text: null as string | null,
    ID: null as string | null,
  })

  const [newKeywordText, setNewKeywordText] = useState(null as string | null)
  const { t } = useTranslation()

  return (
    <>
      <View>
        <CustomText style={styles.section_title} size={24}>
          {props.title}
        </CustomText>
        {props.keywordsList &&
          props.keywordsList.map((keyword: { ID: string; text: string }) => {
            return (
              <RectButton style={styles.keyword_wrap}>
                <Text style={styles.keyword_text}>{keyword.text}</Text>
                <View style={styles.keyword_icons_wrap}>
                  <TouchableOpacity
                    onPress={() => {
                      setOldKeywordObj(keyword)
                      setPopupVisible(true)
                    }}
                  >
                    <FontAwesome name="pencil" size={23} color="black" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      props.deleteBankSmsKeywordThunkCreator(
                        keyword,
                        props.isIncome
                      )
                    }
                  >
                    <AntDesign name="delete" size={23} color="#FF555B" />
                  </TouchableOpacity>
                </View>
              </RectButton>
            )
          })}
        <AddBlockItem
          isIncome={props.isIncome}
          newKeywordText={newKeywordText}
          setNewKeywordText={setNewKeywordText}
          addBankSmsKeywordThunkCreator={props.addBankSmsKeywordThunkCreator}
        />
      </View>

      <InputPopup
        title={
          (props.isIncome
            ? capitalize(t("Notifications.Income"))
            : capitalize(t("Notifications.Expense"))) +
          " " +
          t("BankSMSSettings.Keyword")
        }
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        value={oldKeywordObj.text}
        saveFunction={(text: string) => {
          props.editBankSmsKeywordThunkCreator(
            oldKeywordObj,
            text as string,
            props.isIncome
          )
          setPopupVisible(false)
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  keyword_wrap: {
    marginHorizontal: -15,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  keyword_text: {
    fontSize: 16,
    color: "black",
    flex: 4.5,
  },

  keyword_icons_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },

  section_title: {
    marginTop: 15,
    marginBottom: 5,
  },
})

export default SectionItem
