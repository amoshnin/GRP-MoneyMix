// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //

import { capitalize } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  isIncome: boolean

  newKeywordText: string | null
  setNewKeywordText: (newKeywordText: string | null) => void

  addBankSmsKeywordThunkCreator: (
    keywordText: string,
    isIncome: boolean
  ) => void
}

const AddBlockItem: React.FC<PropsType> = (props) => {
  const [blockVisible, setBlockVisible] = useState(false as boolean)
  const { t } = useTranslation()

  if (blockVisible) {
    return (
      <View style={styles.container}>
        <TextInput
          accessibilityStates
          value={props.newKeywordText as string}
          onChangeText={(text: string) => props.setNewKeywordText(text)}
          label={
            (props.isIncome
              ? capitalize(t("Notifications.Income"))
              : capitalize(t("Notifications.Expense"))) +
            " " +
            t("BankSMSSettings.Keyword")
          }
          style={styles.input}
          mode="outlined"
        />
        <Button
          accessibilityStates
          onPress={() => {
            props.addBankSmsKeywordThunkCreator(
              props.newKeywordText as string,
              props.isIncome
            )
            setBlockVisible(false)
            props.setNewKeywordText(null)
          }}
        >
          OK
        </Button>
        <Button
          accessibilityStates
          onPress={() => {
            setBlockVisible(false)
            props.setNewKeywordText(null)
          }}
        >
          {t("GeneralPhrases.Cancel")}
        </Button>
      </View>
    )
  } else {
    return (
      <TouchableOpacity
        style={[styles.container, styles.button]}
        onPress={() => {
          setBlockVisible(true)
        }}
      >
        <AntDesign name="plus" size={20} color="white" />
        <Text style={styles.button_text}>
          {t("BankSMSSettings.AddKeyword")}
        </Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  button: {
    backgroundColor: "#674ABE",
    alignSelf: "flex-start",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 3,
  },

  button_text: {
    marginLeft: 13,
    fontSize: 14.5,
    color: "white",
  },

  input: {
    flex: 1,
    height: 35,
  },
})

export default AddBlockItem
