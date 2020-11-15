// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import NotifyButton from "./NotifyButton/NotifyButton"
import DataButton from "./DataButton/DataButton"

import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  operation: any
  setPopupVisible: (popupVisibilityStatus: boolean) => void

  scheduled: {
    boolean: boolean
    id: string | null
  }
  setScheduled: (newScheduledInfo: {
    boolean: boolean
    id: string | null
  }) => void

  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => void
  DuplicateOperationThunkCreator: (operation: any) => void
  DeleteOperationsThunkCreator: (operations: Array<any>) => void
}

const ActionsSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      {/* <View style={styles.row }>
        <RoundButton
          title={t("Operations.Popup.Repeat")}
          backgroundColor="#FAC16B"
        >
          <FontAwesome name="refresh" size={24} color="#696969" />
        </RoundButton>
      </View> */}

      <View style={styles.row}>
        <DataButton
          operation={props.operation}
          setPopupVisible={props.setPopupVisible}
          ChangeOperationDateThunkCreator={
            props.ChangeOperationDateThunkCreator
          }
        />
        <NotifyButton
          isIncome={props.operation.isIncome}
          moneyAmount={props.operation.moneyAmount}
          scheduled={props.scheduled}
          setScheduled={props.setScheduled}
        />
        <RoundButton
          title={t("Operations.Popup.Duplicate")}
          backgroundColor="#49DD8C"
          onPress={() => {
            props.setPopupVisible(false)
            props.DuplicateOperationThunkCreator(props.operation)
          }}
        >
          <FontAwesome5 name="copy" size={24} color="#696969" />
        </RoundButton>
        <RoundButton
          title={t("Operations.Popup.Delete")}
          backgroundColor="#FC7C81"
          onPress={() => {
            props.setPopupVisible(false)
            props.DeleteOperationsThunkCreator([props.operation])
          }}
        >
          <MaterialIcons name="delete" size={24} color="#696969" />
        </RoundButton>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 27,
    marginBottom: -17,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
})

export default React.memo(ActionsSection, isEqualMemoComparison)
