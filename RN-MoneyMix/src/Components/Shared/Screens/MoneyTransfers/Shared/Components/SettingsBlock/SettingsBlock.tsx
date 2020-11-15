// PLUGINS IMPORTS //
import React, { useState } from "react"
import { StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import SettingsPopup from "./SettingsPopup/SettingsPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Ionicons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  isAuthentificated: boolean

  isIncome: boolean | null
  totalValue: string

  selectedDate: Date
  setSelectedDate: (newSelectedDate: Date) => void
  removeDateSelection?: boolean
}

const SettingsBlock: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [scheduled, setScheduled] = useState({
    boolean: false,
    id: null,
  } as {
    boolean: boolean
    id: string | null
  })

  return (
    <>
      <BlockItem
        containerStyle={styles.block}
        onPress={() => setPopupVisible(true)}
        icon={<Ionicons name="ios-settings" size={26} color="#674ABE" />}
        isGray
      />

      <SettingsPopup
        navigation={props.navigation}
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        isIncome={props.isIncome}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        totalValue={props.totalValue}
        selectedDate={props.selectedDate}
        setSelectedDate={props.setSelectedDate}
        scheduled={scheduled}
        setScheduled={setScheduled}
        removeDateSelection={props.removeDateSelection}
      />
    </>
  )
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
})

export default React.memo(SettingsBlock, isEqualMemoComparison)
