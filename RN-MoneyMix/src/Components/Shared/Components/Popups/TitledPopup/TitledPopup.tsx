// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet, BackHandler } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import Dialog, {
  DialogContent,
  ScaleAnimation,
  SlideAnimation,
} from "react-native-popup-dialog"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  popupVisible: boolean
  setPopupVisible: (popupVisibility: boolean) => void

  title: string

  wrapperStyle?: any
  headerStyle?: any
  isCustomTitle?: boolean
  isSlideAnimation?: boolean
  //
  height?: number | string
  removeHeight?: boolean
  children: any
}

const TitledPopup: React.FC<PropsType> = (props) => {
  return (
    <Dialog
      dialogStyle={[
        styles.wrapper,
        props.wrapperStyle,
        !props.removeHeight && { height: (props.height as number) || 293 },
      ]}
      visible={props.popupVisible}
      onTouchOutside={() => {
        props.setPopupVisible(false)
      }}
      dialogAnimation={
        props.isSlideAnimation
          ? new SlideAnimation({
              slideFrom: "bottom",
            })
          : new ScaleAnimation({
              initialValue: 0,
              useNativeDriver: true,
            } as any)
      }
      onShow={() =>
        BackHandler.addEventListener("hardwareBackPress", () => {
          if (props.popupVisible) {
            props.setPopupVisible(false)
            return true
          }
        })
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent style={styles.container}>
        <View style={styles.content_wrap}>
          <View style={[styles.header, props.headerStyle]}>
            {props.isCustomTitle ? (
              <CustomText style={styles.title}>{props.title}</CustomText>
            ) : (
              <Text style={styles.title}>{props.title}</Text>
            )}
          </View>

          {props.children}
        </View>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 17,
    alignItems: "center",
    backgroundColor: "#F1F1F1",
  },

  container: {
    width: "100%",
  },

  content_wrap: {
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    height: "100%",
  },

  header: {
    height: 50,
    width: "130%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    elevation: 7,
  },

  title: {
    opacity: 0.8,
    fontSize: 21,
    color: "black",
  },
})

export default React.memo(TitledPopup, isEqualMemoComparison)
