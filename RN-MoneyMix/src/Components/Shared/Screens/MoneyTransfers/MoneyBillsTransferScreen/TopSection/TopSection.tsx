// PLUGINS IMPORTS //
import React, { useState } from "react"

// COMPONENTS IMPORTS //
import UpperSection from "./UpperSection/UpperSection"
import BillsSelectPopup from "~/Components/Shared/Components/Popups/BillsSelectPopup/BillsSelectPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  sendingBillData: any
  firstBillData: any

  selectedCurrency: string | null

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  setSendingBillData: (firstBillData: any) => void
}

const TopSection: React.FC<PropsType> = (props) => {
  const [billPopupShown, setBillPopupShown] = useState(false as boolean)

  return (
    <>
      <UpperSection
        firstBillData={props.firstBillData}
        setBillPopupShown={setBillPopupShown}
        sendingBillData={props.sendingBillData}
        selectedCurrency={props.selectedCurrency}
      />
      <BillsSelectPopup
        selectedCurrency={props.selectedCurrency}
        popupShown={billPopupShown}
        setPopupShown={setBillPopupShown}
        setSelectedBill={props.setSendingBillData}
        selectedBill={props.sendingBillData}
        normalBillsList={
          props.normalBillsList &&
          props.normalBillsList.filter(
            (bill: any) => bill.name !== props.firstBillData.name
          )
        }
        debtsBillsList={
          props.debtsBillsList &&
          props.debtsBillsList.filter(
            (bill: any) => bill.name !== props.firstBillData.name
          )
        }
        savingsBillsList={
          props.savingsBillsList &&
          props.savingsBillsList.filter(
            (bill: any) => bill.name !== props.firstBillData.name
          )
        }
      />
    </>
  )
}

export default React.memo(TopSection, isEqualMemoComparison)
