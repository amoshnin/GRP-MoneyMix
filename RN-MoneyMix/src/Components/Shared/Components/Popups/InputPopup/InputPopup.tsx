// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, StyleSheet, Keyboard, BackHandler } from "react-native"
import { TextInput, Button } from "react-native-paper"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { Formik } from "formik"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: any

  title: string | null
  value?: string | undefined | null

  saveFunction?: any
  onChangeFunction?: any
  isNumberPad?: boolean
}

const InputPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  return (
    <Dialog
      width={320}
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => props.setPopupVisible(false)}
      dialogAnimation={
        new ScaleAnimation({
          initialValue: 0,
          useNativeDriver: true,
        } as any)
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <Formik
          initialValues={{
            value: null as number | null,
          }}
          onSubmit={(values: any) => {
            Keyboard.dismiss()
            props.onChangeFunction && props.onChangeFunction(values.value)
            props.saveFunction && props.saveFunction(values.value)
            props.setPopupVisible(false)
          }}
        >
          {(FormikProps) => {
            useEffect(() => {
              FormikProps.setValues({ value: props.value as any })
            }, [props.popupVisible])

            return (
              <>
                <TextInput
                  accessibilityStates
                  style={styles.input}
                  mode="outlined"
                  label={props.title as string}
                  value={FormikProps.values.value as any}
                  onChangeText={FormikProps.handleChange("value")}
                  onBlur={() => {
                    FormikProps.handleBlur("value")
                  }}
                  autoFocus
                  keyboardType={props.isNumberPad ? "number-pad" : "default"}
                />

                <View style={styles.buttons_wrap}>
                  <Button
                    accessibilityStates
                    style={styles.button}
                    onPress={() => {
                      Keyboard.dismiss()
                      props.setPopupVisible(false)
                    }}
                  >
                    {t("GeneralPhrases.Cancel")}
                  </Button>

                  <Button
                    accessibilityStates
                    style={styles.button}
                    onPress={FormikProps.handleSubmit}
                  >
                    {t("GeneralPhrases.Ok")}
                  </Button>
                </View>
              </>
            )
          }}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 17,
  },

  container: {
    justifyContent: "center",
    marginTop: 18,
    marginBottom: -25,
  },

  input: {
    backgroundColor: "white",
    height: 45,
    marginBottom: 15,
  },

  button: {
    height: 45,
  },

  buttons_wrap: {
    flexDirection: "row",
    alignSelf: "flex-end",
  },
})

export default React.memo(InputPopup, isEqualMemoComparison)
