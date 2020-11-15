// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
} from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { RadioButton, Button } from "react-native-paper"
import CustomText from "~/Components/Shared/Components/Text/Text"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title?: string
  fields?: Array<string>
  storageName: string

  setDataFunction?: any
  hidePopup: () => void
  getValues?: any

  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void
}

const PopupContent: React.FC<PropsType> = (props) => {
  const [selectedField, setSelectedField] = useState("" as string)

  useEffect(() => {
    getField()
  }, [])

  const getField = async () => {
    try {
      const field = await AsyncStorage.getItem(props.storageName)
      setSelectedField(field as any)
      props.getValues()
    } catch (e) {}
  }
  const { t, i18n } = useTranslation()

  const setSelectedFieldToStorage = async (value: string) => {
    props.setDataFunction && props.setDataFunction(value)

    await AsyncStorage.setItem(props.storageName, value)
    getField()

    if (props.storageName === "selectedLanguage") {
      value === "English"
        ? i18n.changeLanguage("en")
        : value === "Russian"
        ? i18n.changeLanguage("ru")
        : value === "Spanish"
        ? i18n.changeLanguage("es")
        : value === "German"
        ? i18n.changeLanguage("de")
        : null
    }
  }

  return (
    <Dialog
      visible={props.popupVisible}
      dialogStyle={styles.wrapper}
      onTouchOutside={() => props.setPopupVisible(false)}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onShow={() => {
        BackHandler.addEventListener("hardwareBackPress", () => {
          if (props.popupVisible) {
            props.setPopupVisible(false)
            return true
          }
        })
      }}
      onDismiss={() =>
        BackHandler.addEventListener("hardwareBackPress", () => {
          BackHandler.exitApp()
          return true
        })
      }
    >
      <DialogContent>
        <View style={styles.container}>
          <View style={styles.header}>
            <CustomText style={styles.header_text}>{props.title}</CustomText>
          </View>
          <ScrollView style={styles.content_wrap}>
            {props.fields?.map((field: string) => {
              return (
                <View style={styles.field_wrap}>
                  <RadioButton
                    value={field}
                    status={selectedField === field ? "checked" : "unchecked"}
                    onPress={() => setSelectedField(field)}
                    color="#673AB7"
                  />
                  <TouchableOpacity
                    onPress={() => setSelectedField(field)}
                    style={styles.field_text}
                  >
                    <Text style={styles.text}>
                      {t(`DrawerNavigator.ButtonsList.${field}`)}
                    </Text>
                  </TouchableOpacity>
                </View>
              )
            })}
          </ScrollView>
          <View style={styles.footer}>
            <Button
              accessibilityStates
              mode="text"
              color={"#673AB7"}
              onPress={() => props.hidePopup()}
            >
              {t("GeneralPhrases.Cancel")}
            </Button>
            <Button
              accessibilityStates
              mode="text"
              color={"#673AB7"}
              onPress={() => {
                props.hidePopup()
                setSelectedFieldToStorage(selectedField)
              }}
            >
              ok
            </Button>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    position: "absolute",
    bottom: 0,
  },

  container: {
    width: 300,
    marginHorizontal: -18,
    marginBottom: -30,
    backgroundColor: "#EFEFEF",
  },

  header: {
    height: 68,
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 3,
  },

  header_text: {
    fontSize: 20,
    marginHorizontal: 15,
  },

  content_wrap: {
    paddingVertical: 10,
    paddingTop: 20,
    marginHorizontal: 10,
  },

  field_wrap: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
  },

  field_text: {
    width: "100%",
  },

  text: {
    color: "black",
  },

  footer: {
    height: 51,
    elevation: 25,
    backgroundColor: "white",
    marginVertical: 7,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
})

export default React.memo(PopupContent, isEqualMemoComparison)
