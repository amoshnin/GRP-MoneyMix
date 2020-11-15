// PLUGINS IMPORTS //
import React from "react"
import { ScrollView, StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  ScaleAnimation,
} from "react-native-popup-dialog"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderBillName,
  renderBillIcon,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null
  oldBill: any

  billsArray: Array<{}>

  popupVisible: boolean
  setPopupVisible: (popupVisibuility: boolean) => void
  ChangeImportantBillThunkCreator: (oldBill: any, newBill: any) => void
}

const BillsSelectPopup: React.FC<PropsType> = (props) => {
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
        <ScrollView contentContainerStyle={styles.content_wrap}>
          {props.billsArray &&
            props.billsArray.map((bill: any) => {
              return (
                <Button
                  title={renderBillName(bill.name, t)}
                  content={`${bill.price || bill.accountBalance || 0} ${t(
                    `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
                  )}`}
                  icon={renderBillIcon(bill.type, bill.icon)}
                  containerStyle={styles.button}
                  onPress={() => {
                    props.setPopupVisible(false)
                    props.ChangeImportantBillThunkCreator(props.oldBill, bill)
                  }}
                />
              )
            })}
        </ScrollView>
      </DialogContent>
    </Dialog>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: "90%",
    maxHeight: "45%",
  },

  container: {
    marginHorizontal: -19,
    marginBottom: -15,
    marginVertical: 10,
  },

  content_wrap: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 29,
  },

  button: {
    marginVertical: 10,
  },
})

export default React.memo(BillsSelectPopup, isEqualMemoComparison)
