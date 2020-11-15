// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  DialogFooter,
  SlideAnimation,
} from "react-native-popup-dialog"
import { Button } from "react-native-paper"
import GestureRecognizer from "react-native-swipe-gestures"
import { config } from "~/Components/Shared/Helpers/Functions/DateChangeFunctions"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  title?: string | null
  content: any
  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void

  removeCancelBtn?: boolean
  function?: () => void
  confirmButtonText?: string
  cancelFunction?: () => void
  cancelButtonText?: string
}

const AlertPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  BackHandler.addEventListener("hardwareBackPress", () => {
    if (props.popupVisible) {
      props.setPopupVisible(false)
      return true
    }
  })

  return (
    <Dialog
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      onTouchOutside={() => {
        props.setPopupVisible(false)
      }}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "top",
        })
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
      footer={
        <DialogFooter style={styles.footer}>
          <Button
            accessibilityStates
            style={styles.button}
            labelStyle={[styles.button_text, { color: "gray" }]}
            onPress={() => {
              props.setPopupVisible(false)
              props.cancelFunction && props.cancelFunction()
            }}
            disabled={props.removeCancelBtn}
          >
            {!props.removeCancelBtn &&
              (props.cancelButtonText
                ? props.cancelButtonText
                : t("GeneralPhrases.Cancel"))}
          </Button>

          <Button
            accessibilityStates
            style={styles.button}
            labelStyle={styles.button_text}
            onPress={() => {
              props.setPopupVisible(false)
              props.function && props.function()
            }}
          >
            {props.confirmButtonText
              ? props.confirmButtonText
              : t("GeneralPhrases.Ok")}
          </Button>
        </DialogFooter>
      }
    >
      <DialogContent>
        <GestureRecognizer
          onSwipeDown={() => props.setPopupVisible(false)}
          onSwipeUp={() => props.setPopupVisible(false)}
          config={config}
          style={styles.container}
        >
          {props.title && <Text style={styles.title}>{props.title}</Text>}
          <View style={!props.title && styles.content}>{props.content}</View>
        </GestureRecognizer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 17,
    position: "absolute",
    marginHorizontal: 20,
    width: 320,
    top: 0,
  },

  container: {
    marginTop: 30,
  },

  title: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
    color: "black",
  },

  content: {
    marginTop: 30,
  },

  footer: {
    justifyContent: "flex-end",
  },

  button: {
    height: 45,
  },

  button_text: {
    fontSize: 16,
    color: "#673AB7",
  },
})

export default React.memo(AlertPopup, isEqualMemoComparison)
