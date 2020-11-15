// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { StyleSheet, BackHandler } from "react-native"
import Dialog, {
  SlideAnimation,
  DialogContent,
} from "react-native-popup-dialog"
import GestureRecognizer from "react-native-swipe-gestures"
import { config } from "~/Components/Shared/Helpers/Functions/DateChangeFunctions"

// COMPONENTS IMPORTS //
import UpperSection from "./UpperSection/UpperSection"
import BottomSection from "./BottomSection/BottomSection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  billData: any
  billType: string | null
  defaultBill: any

  popupVisible: boolean
  setPopupVisible: (editPopupVisiblityStatus: boolean) => void
  setTransferInitalNav: (transferInitalNav: string) => void

  transferScreensPopupVisible: boolean
  setTransferScreensPopupVisible: (
    transferScreensPopupVisibility: boolean
  ) => void
  getDefaultBillThunkCreator: () => void
  setDefaultBillThunkCreator: (defaultBill: any) => void
}

const EditBillPopup: React.FC<PropsType> = (props) => {
  const [disableExitApp, setDisableExitApp] = useState(false as boolean)
  useEffect(() => {
    props.getDefaultBillThunkCreator()
  }, [])

  return (
    <Dialog
      dialogStyle={styles.wrapper}
      visible={props.popupVisible}
      width={340}
      onTouchOutside={() => {
        props.setPopupVisible(false)
      }}
      dialogAnimation={
        new SlideAnimation({
          slideFrom: "bottom",
        })
      }
      onShow={() =>
        BackHandler.addEventListener("hardwareBackPress", () => {
          props.setPopupVisible(false)
          return true
        })
      }
      onDismiss={() => {
        if (!disableExitApp) {
          BackHandler.addEventListener("hardwareBackPress", () => {
            BackHandler.exitApp()
            return true
          })
        } else {
          setDisableExitApp(false)
        }
      }}
    >
      <DialogContent style={styles.container}>
        <GestureRecognizer
          onSwipeDown={() => props.setPopupVisible(false)}
          config={config}
          style={styles.container}
        >
          <UpperSection
            selectedCurrency={props.selectedCurrency}
            billData={props.billData}
            accountBalance={
              props.billData &&
              (props.billData.accountBalance ||
                props.billData.price ||
                props.billData.totalDebtSum - props.billData.iOwe)
            }
            defaultBill={props.defaultBill}
            setDefaultBillThunkCreator={props.setDefaultBillThunkCreator}
          />
          <BottomSection
            navigation={props.navigation}
            billData={props.billData}
            billType={props.billType}
            popupVisible={props.popupVisible}
            setPopupVisible={props.setPopupVisible}
            setTransferInitalNav={props.setTransferInitalNav}
            setDisableExitApp={setDisableExitApp}
            //
            transferScreensPopupVisible={props.popupVisible}
            setTransferScreensPopupVisible={
              props.setTransferScreensPopupVisible
            }
          />
        </GestureRecognizer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#F1F1F1",
    position: "absolute",
    bottom: 0,
    borderRadius: 20,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
  },

  container: {
    justifyContent: "center",
    marginHorizontal: -17,
  },
})

export default React.memo(EditBillPopup, isEqualMemoComparison)
