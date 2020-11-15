// PLUGINS IMPORTS //
import React from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import TitledPopup from "~/Components/Shared/Components/Popups/TitledPopup/TitledPopup"
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import {
  renderBillName,
  renderBillIcon,
  renderBillMoney,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  popupShown: boolean
  setPopupShown: (billPopupShownStatus: boolean) => void

  selectedBill: any
  setSelectedBill: (selectedBill: any) => void
}

const BillSelectPopup: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  let FilteredBills = [] as Array<any>
  if (props.normalBillsList && props.normalBillsList.length > 0) {
    FilteredBills.push(
      ...props.normalBillsList.filter(
        (obj: any) => obj.name !== props.selectedBill.name
      )
    )
  }

  if (props.debtsBillsList && props.debtsBillsList.length > 0) {
    FilteredBills.push(
      ...props.debtsBillsList.filter(
        (obj: any) => obj.name !== props.selectedBill.name
      )
    )
  }

  if (props.savingsBillsList && props.savingsBillsList.length > 0) {
    FilteredBills.push(
      ...props.savingsBillsList.filter(
        (obj: any) => obj.name !== props.selectedBill.name
      )
    )
  }

  return (
    <TitledPopup
      popupVisible={props.popupShown}
      setPopupVisible={props.setPopupShown}
      title={t("MoneyCategoriesTransferScreen.Popups.ChooseBill")}
      wrapperStyle={styles.wrapper}
    >
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {FilteredBills &&
          FilteredBills.map((bill: any) => {
            return (
              <Button
                title={renderBillName(bill.name, t)}
                icon={renderBillIcon(bill.type, bill.icon)}
                content={renderPrice(
                  renderBillMoney(
                    bill.type,
                    bill.accountBalance,
                    bill.iOwe,
                    bill.totalDebtSum
                  ),
                  props.selectedCurrency,
                  t
                )}
                containerStyle={styles.button}
                onPress={() => {
                  props.setSelectedBill(bill)
                  props.setPopupShown(false)
                }}
              />
            )
          })}
      </ScrollView>
    </TitledPopup>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    width: 310,
    marginHorizontal: -19,
    backgroundColor: "#F1F1F1",
  },

  content: {
    marginTop: 6,
    flex: 1,
  },

  button: {
    marginVertical: 10,
    justifyContent: "space-between",
    elevation: 0,
    width: 220,
  },
})

export default React.memo(BillSelectPopup, isEqualMemoComparison)
