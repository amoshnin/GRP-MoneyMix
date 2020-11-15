// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SectionItem from "./SectionItem/SectionItem"

import { capitalize } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { ScrollView } from "react-native-gesture-handler"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  incomeKeywords: Array<{
    ID: string
    text: string
  }>
  expensesKeywords: Array<{
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
  getBankSMSKeywordsThunkCreator: () => void
}

const KeywordsScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      props.getBankSMSKeywordsThunkCreator()
    })
  }, [props.navigation])

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SectionItem
        title={capitalize(t("Notifications.Income"))}
        isIncome={true}
        keywordsList={props.incomeKeywords}
        addBankSmsKeywordThunkCreator={props.addBankSmsKeywordThunkCreator}
        editBankSmsKeywordThunkCreator={props.editBankSmsKeywordThunkCreator}
        deleteBankSmsKeywordThunkCreator={
          props.deleteBankSmsKeywordThunkCreator
        }
      />
      <View style={styles.divider} />
      <SectionItem
        title={capitalize(t("Notifications.Expense"))}
        isIncome={false}
        keywordsList={props.expensesKeywords}
        addBankSmsKeywordThunkCreator={props.addBankSmsKeywordThunkCreator}
        editBankSmsKeywordThunkCreator={props.editBankSmsKeywordThunkCreator}
        deleteBankSmsKeywordThunkCreator={
          props.deleteBankSmsKeywordThunkCreator
        }
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 15,
  },

  divider: {
    borderWidth: 0.6,
    borderColor: "silver",
    marginTop: 20,
  },
})

export default KeywordsScreen
