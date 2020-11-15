// PLUGINS IMPORTS //
import React, { useState } from "react"
import { StyleSheet, BackHandler } from "react-native"
import Dialog, {
  DialogContent,
  SlideAnimation,
} from "react-native-popup-dialog"
import dayjs from "dayjs"
import GestureRecognizer from "react-native-swipe-gestures"

import { config } from "~/Components/Shared/Helpers/Functions/DateChangeFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// COMPONENTS IMPORTS //
import Header from "./Header/Header"
import Body from "./Body/Body"
import Footer from "./Footer/Footer"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean

  popupVisible: boolean
  setPopupVisible: (popupVisibleStatus: boolean) => void

  selectedCurrency: string | null
  category: any
  billData: any
  percentage: number

  operationsList: Array<any>
  showGraphicsField?: boolean
  setSelectedCategory?: (newSelectedCategory: any) => void
}

const CategoryDetailsPopup: React.FC<PropsType> = (props) => {
  const [disableExitApp, setDisableExitApp] = useState(false as boolean)
  let TempYearPrice = 0
  let TempMonthPrice = 0

  const MonthStart = dayjs().startOf("month").format("YYYY-MM-DD")
  const YearStart = dayjs().startOf("year").format("YYYY-MM-DD")
  //
  props.operationsList &&
    props.operationsList.forEach((operation: any) => {
      if (
        dayjs(dayjs(MonthStart).format("YYYY-MM-DD")).isBefore(
          dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
        )
      ) {
        const CleanedArray =
          props.operationsList &&
          props.operationsList
            .filter(
              (operation: any) => operation.category.id === props.category.id
            )
            .filter((operation: any) => {
              return dayjs(dayjs(MonthStart).format("YYYY-MM-DD")).isBefore(
                dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
              )
            })

        const Prices = CleanedArray.map((oper: any) => oper.moneyAmount)
        TempMonthPrice = Prices.reduce((a, b) => Number(a) + Number(b), 0)
      }

      if (
        dayjs(dayjs(YearStart).format("YYYY-MM-DD")).isBefore(
          dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
        )
      ) {
        const CleanedArray =
          props.operationsList &&
          props.operationsList
            .filter(
              (operation: any) => operation.category.id === props.category.id
            )
            .filter((operation: any) => {
              return dayjs(dayjs(MonthStart).format("YYYY-MM-DD")).isBefore(
                dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
              )
            })

        const Prices = CleanedArray.map((oper: any) => oper.moneyAmount)
        TempYearPrice = Prices.reduce((a, b) => Number(a) + Number(b), 0)
      }
    })

  const count =
    props.operationsList &&
    props.operationsList
      .filter((operation: any) => !(Number(operation.category.price) <= 0))
      .reduce(
        (acc, cur) =>
          cur.category.title === props.category.title ? ++acc : acc,
        0
      )

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
      onShow={() =>
        BackHandler.addEventListener("hardwareBackPress", () => {
          if (props.popupVisible) {
            props.setPopupVisible(false)
            return true
          }
        })
      }
      onDismiss={() => {
        if (!disableExitApp) {
          BackHandler.addEventListener(
            "hardwareBackPress",
            () => BackHandler.exitApp() as any
          )
        } else {
          setDisableExitApp(false)
        }
      }}
    >
      <DialogContent>
        <GestureRecognizer
          onSwipeDown={() => props.setPopupVisible(false)}
          config={config}
        >
          <Header
            title={props.category.title}
            icon={props.category.icon}
            color={props.category.color}
          />
          <Body
            category={props.category}
            percentage={props.percentage}
            selectedCurrency={props.selectedCurrency}
            operationsCount={count}
            yearPrice={TempYearPrice}
            monthPrice={TempMonthPrice}
          />
          <Footer
            navigation={props.navigation}
            isIncome={props.isIncome}
            category={props.category}
            billData={props.billData}
            setPopupVisible={props.setPopupVisible}
            showGraphicsField={props.showGraphicsField}
            setSelectedCategory={props.setSelectedCategory}
            setDisableExitApp={setDisableExitApp}
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
    width: "90%",
    position: "absolute",
    bottom: 0,
  },
})

export default React.memo(CategoryDetailsPopup, isEqualMemoComparison)
