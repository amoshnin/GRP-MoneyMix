import React, { useState } from "react"
import { ScrollView, RefreshControl, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import PlusButton from "~/Components/Shared/Components/Buttons/PlusButton/PlusButton"
import BillsSelectPopup from "./BillsSelectPopup/BillsSelectPopup"

import {
  renderBillName,
  renderBillIcon,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  refreshing: boolean
  onRefresh: any

  navigation: any
  selectedCurrency: string | null

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  ImportantBills: Array<any>

  ChangeImportantBillThunkCreator: (oldBill: any, newBill: any) => void
}

const Header: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false)
  const [oldBill, setOldBill] = useState(null)
  const { t } = useTranslation()

  const cleanedBillsArray =
    props.normalBillsList &&
    props.normalBillsList.filter(
      (x) => !props.ImportantBills.filter((y) => y && y.name === x.name).length
    )

  const allowPopup = cleanedBillsArray.length > 0
  const onPlusPress = () => {
    setOldBill(null)
    setPopupVisible(true)
  }

  return (
    <>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={
          <RefreshControl
            refreshing={props.refreshing}
            onRefresh={props.onRefresh}
            colors={["#674ABE"]}
          />
        }
      >
        {props.ImportantBills &&
          props.ImportantBills.sort((a, b) => {
            var textA = a.name.toUpperCase()
            var textB = b.name.toUpperCase()
            return textA < textB ? -1 : textA > textB ? 1 : 0
          }).map((bill: any) => {
            if (bill) {
              return (
                <Button
                  title={renderBillName(bill.name, t)}
                  content={renderPrice(
                    bill.price || bill.accountBalance || 0,
                    props.selectedCurrency,
                    t,
                    false,
                    7
                  )}
                  icon={renderBillIcon(bill.type, bill.icon)}
                  onPress={() => {
                    setOldBill(bill)
                    allowPopup && setPopupVisible(true)
                  }}
                  containerStyle={styles.button}
                />
              )
            } else {
              return <PlusButton onPress={onPlusPress} />
            }
          })}
        {props.ImportantBills.length < 2 && allowPopup && (
          <PlusButton onPress={onPlusPress} />
        )}
        {props.ImportantBills.length < 1 && allowPopup && (
          <PlusButton onPress={onPlusPress} />
        )}
      </ScrollView>

      <BillsSelectPopup
        oldBill={oldBill}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        selectedCurrency={props.selectedCurrency}
        billsArray={cleanedBillsArray}
        ChangeImportantBillThunkCreator={props.ChangeImportantBillThunkCreator}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignSelf: "center",
    alignItems: "center",
    marginVertical: 16,
    marginHorizontal: 5,
  },

  button: {
    flex: 1,
    maxWidth: 158,
    marginHorizontal: 15,
  },
})

export default React.memo(Header, isEqualMemoComparison)
