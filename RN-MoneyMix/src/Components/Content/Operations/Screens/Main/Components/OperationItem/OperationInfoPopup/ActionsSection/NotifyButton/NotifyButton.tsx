// PLUGINS IMPORTS //
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import NotificationSelectPopup from "~/Components/Shared/Components/Popups/NotificationSelectPopup/NotificationSelectPopup"

import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  isIncome: boolean
  moneyAmount: string

  scheduled: {
    boolean: boolean
    id: string | null
  }
  setScheduled: (newScheduledInfo: {
    boolean: boolean
    id: string | null
  }) => void
}

const NotifyButton: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)

  const { t } = useTranslation()

  return (
    <>
      <RoundButton
        title={t("Operations.Popup.Notify")}
        backgroundColor="#EAFF6C"
        onPress={() => setPopupVisible(true)}
      >
        <Ionicons name="ios-notifications" size={24} color="#696969" />
      </RoundButton>
      <NotificationSelectPopup
        isIncome={props.isIncome}
        moneyAmount={props.moneyAmount}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        scheduled={props.scheduled}
        setScheduled={props.setScheduled}
      />
    </>
  )
}

export default React.memo(NotifyButton, isEqualMemoComparison)
