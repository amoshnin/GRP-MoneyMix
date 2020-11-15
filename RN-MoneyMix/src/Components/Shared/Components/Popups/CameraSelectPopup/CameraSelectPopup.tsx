// PLUGINS IMPORTS //
import React from "react"
import { StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"

import { getImage } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { Ionicons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  popupVisible: boolean
  setPopupVisible: any

  navigationDest: string

  selectedImages: Array<any>
  setSelectedImages: (selectedImages: any) => void

  selectedCategory: any
  selectedBill: any
  comment: string
  moneyAmount: string
  isIncome: boolean
}

const CameraSelectPopup: React.FC<PropsType> = (props) => {
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
        BackHandler.addEventListener("hardwareBackPress", () =>
          props.navigation.goBack()
        )
      }
    >
      <DialogContent style={styles.container}>
        <Button
          containerStyle={styles.button}
          title={t("Operations.Gallery.Camera")}
          icon={<Feather name="camera" size={24} color="#674ABE" />}
          onPress={async () => {
            await props.setPopupVisible(false)
            getImage(
              (blob: Blob) =>
                props.setSelectedImages(props.selectedImages.concat(blob)),
              true
            )
          }}
        />
        <Button
          containerStyle={styles.button}
          title={t("Operations.Gallery.Gallery")}
          icon={<Ionicons name="md-images" size={24} color="#674ABE" />}
          onPress={() => {
            getImage((blob: Blob) =>
              props.setSelectedImages(props.selectedImages.concat(blob))
            )
            props.setPopupVisible(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 18,
    height: "15%",
    paddingTop: 25,
    width: "95%",
  },

  container: {
    flex: 1,
    justifyContent: "space-evenly",
    flexDirection: "row",
  },

  button: {
    marginHorizontal: 25,
  },
})

export default React.memo(CameraSelectPopup, isEqualMemoComparison)
