// PLUGINS IMPORTS //
import React, { useState } from "react"
import { Platform } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome5 } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  operation: any

  setPopupVisible: (popupVisible: boolean) => void
  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => any
}

const DataButton: React.FC<PropsType> = (props) => {
  const [date, setDate] = useState(new Date(props.operation.createdAt))
  const [show, setShow] = useState(false)
  const { t } = useTranslation()

  const onChange = (event: any, selectedDate: any) => {
    const currentDate = selectedDate || date
    setShow(Platform.OS === "ios")
    setDate(currentDate)
    props.ChangeOperationDateThunkCreator(props.operation, selectedDate)
    props.setPopupVisible(false)
  }

  return (
    <>
      <RoundButton
        title={t("Operations.Popup.Date")}
        backgroundColor="#86BAF8"
        onPress={() => setShow(true)}
      >
        <FontAwesome5 name="calendar-check" size={24} color="#696969" />
      </RoundButton>

      {show && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </>
  )
}

export default React.memo(DataButton, isEqualMemoComparison)
