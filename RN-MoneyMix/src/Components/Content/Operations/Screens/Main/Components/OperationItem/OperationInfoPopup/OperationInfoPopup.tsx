// PLUGINS IMPORTS //
import React, { useState } from "react"
import { BackHandler, StyleSheet } from "react-native"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import GestureRecognizer from "react-native-swipe-gestures"
import { config } from "~/Components/Shared/Helpers/Functions/DateChangeFunctions"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import ProfileSection from "./ProfileSection/ProfileSection"
import ImageSection from "./ImageSection/ImageSection"
import BottomInfo from "./BottomInfo/BottomInfo"
import ActionsSection from "./ActionsSection/ActionsSection"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  popupVisible: boolean
  setPopupVisible: (popupVisibleStatus: boolean) => void

  selectedCurrency: string | null
  operation: any

  itemText: () => void
  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
  DuplicateOperationThunkCreator: (operation: any) => void
  DeleteOperationsThunkCreator: (operations: Array<any>) => void
}

const OperationInfoPopup: React.FC<PropsType> = (props) => {
  const [scheduled, setScheduled] = useState({
    boolean: false,
    id: null,
  } as {
    boolean: boolean
    id: string | null
  })

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
          slideFrom: "bottom",
        })
      }
      onDismiss={() =>
        BackHandler.addEventListener(
          "hardwareBackPress",
          () => BackHandler.exitApp() as any
        )
      }
    >
      <DialogContent>
        <GestureRecognizer
          onSwipeDown={() => props.setPopupVisible(false)}
          config={config}
          style={styles.container}
        >
          <Header
            bill={props.operation.bill}
            category={props.operation.category}
            isIncome={props.operation.isIncome}
            moneyAmount={props.operation.moneyAmount}
            user={props.operation.user}
            createdAt={props.operation.createdAt}
            selectedCurrency={props.selectedCurrency}
            operationType={props.operation.operation}
          />

          <ProfileSection operation={props.operation} />

          {props.operation.PhotosURLsList &&
            props.operation.PhotosURLsList.length > 0 && (
              <ImageSection
                navigation={props.navigation}
                isOnline={props.isOnline}
                popupVisible={props.popupVisible}
                setPopupVisible={props.setPopupVisible}
                PhotosURLsList={props.operation.PhotosURLsList}
              />
            )}

          <BottomInfo
            selectedCurrency={props.selectedCurrency}
            operation={props.operation}
            itemText={props.itemText}
            setPopupVisible={props.setPopupVisible}
            addOperationCommentThunkCreator={
              props.addOperationCommentThunkCreator
            }
          />

          <ActionsSection
            operation={props.operation}
            setPopupVisible={props.setPopupVisible}
            scheduled={scheduled}
            setScheduled={setScheduled}
            ChangeOperationDateThunkCreator={
              props.ChangeOperationDateThunkCreator
            }
            DuplicateOperationThunkCreator={
              props.DuplicateOperationThunkCreator
            }
            DeleteOperationsThunkCreator={props.DeleteOperationsThunkCreator}
          />
        </GestureRecognizer>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderTopRightRadius: 17,
    borderTopLeftRadius: 17,
    borderRadius: 0,
    width: "100%",
    bottom: 0,
    position: "absolute",
  },

  container: {
    marginVertical: -15,
    marginHorizontal: -15,
  },
})

export default React.memo(OperationInfoPopup, isEqualMemoComparison)
