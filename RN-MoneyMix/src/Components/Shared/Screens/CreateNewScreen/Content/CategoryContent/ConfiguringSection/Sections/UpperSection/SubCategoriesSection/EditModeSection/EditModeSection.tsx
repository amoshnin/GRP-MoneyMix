// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { TextInput, Button } from "react-native-paper"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import generateRandomID from "~/Components/Shared/Helpers/Constants/RandomID"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Entypo } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  editMode: boolean
  setEditMode: (editModeStatus: boolean) => void

  subCategories: Array<any>
  setSubCategories: (newSubCategories: Array<any>) => void
  sendingSubCategories: Array<any>
  setSendingSubCategories: (newSendingSubCategories: Array<any>) => void
}

const EditModeSection: React.FC<PropsType> = (props) => {
  const [title, setTitle] = useState(null as string | null)
  const { t } = useTranslation()

  const createSubCategory = () => {
    const newSubCategory = {
      title: title,
      icon: "shopping-bag",
      color: "#674ABE",
      price: 0,
      id: generateRandomID(),
    }

    props.setSubCategories([...props.subCategories, newSubCategory])
    props.setSendingSubCategories([
      ...props.sendingSubCategories,
      newSubCategory,
    ])
    setTitle(null)
  }

  useEffect(() => {
    props.navigation.addListener("blur", () => {
      setTitle(null)
      props.setEditMode(false)
    })
  }, [props.navigation])

  return (
    <>
      {props.editMode ? (
        <View style={styles.edit_wrap}>
          <TextInput
            style={styles.input}
            accessibilityStates
            label={t("CreateScreen.Header.Name")}
            mode="outlined"
            value={title as string}
            onChangeText={(text: string) => setTitle(text)}
          />
          <Button
            onPress={() => {
              createSubCategory()
              props.setEditMode(false)
            }}
            accessibilityStates
          >
            OK
          </Button>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.btn_wrap}
          onPress={() => props.setEditMode(true)}
        >
          <Entypo name="plus" size={21} color="#674ABE" />
          <Text style={[styles.bold, { marginLeft: 6, fontSize: 15 }]}>
            {t("CreateScreen.Body.AddSubCategory")}
          </Text>
        </TouchableOpacity>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 19,
    marginBottom: 10,
  },

  bold: {
    fontWeight: "bold",
    color: "black",
  },

  btn_wrap: {
    flexDirection: "row",
    alignItems: "center",
  },

  list_wrap: {
    marginTop: -7,
    borderBottomWidth: 1,
    borderBottomColor: "#DCDCDC",
    marginHorizontal: -17,
    paddingHorizontal: 17,
    marginBottom: 18,
    paddingBottom: 18,
  },

  edit_wrap: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
  },

  input: {
    flex: 1,
    backgroundColor: "white",
    height: 40,
  },
})

export default React.memo(EditModeSection, isEqualMemoComparison)
