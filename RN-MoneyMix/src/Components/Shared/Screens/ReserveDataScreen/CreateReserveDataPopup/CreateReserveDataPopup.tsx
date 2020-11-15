// PLUGINS IMPORTS //
import React from "react"
import { Text, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: (popupVisibilityStatus: boolean) => void

  function: () => void
}

const CreateReserveDataPopup: React.FC<PropsType> = (props) => {
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
        <Text style={styles.text}>
          {t("DrawerNavigator.ButtonsList.ReserveData")}{" "}
          {t("GeneralPhrases.for")}
          <Text style={styles.bold_text}>
            {" "}
            {dayjs(Date.now()).format("DD/MM/YYYY-HH:mm")}
          </Text>
        </Text>
        <Button
          title={t("GeneralPhrases.Confirm")}
          containerStyle={styles.button}
          onPress={props.function}
          unSliceTitle
        />
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 17,
    paddingVertical: 25,
    width: "80%",
  },

  container: {
    alignItems: "center",
    paddingBottom: -22,
  },

  text: {
    textAlign: "center",
    lineHeight: 22,
  },

  bold_text: {
    fontWeight: "bold",
  },

  button: {
    marginTop: 20,
    width: "90%",
  },
})

export default React.memo(CreateReserveDataPopup, isEqualMemoComparison)
