// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import DateSection from "./DateSection/DateSection"
import PriceSection from "./PriceSection/PriceSection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null
  operation: any

  itemText: () => any
  setPopupVisible: (popupVisibility: boolean) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
}

const BottomInfo: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <DateSection
        operation={props.operation}
        setPopupVisible={props.setPopupVisible}
        addOperationCommentThunkCreator={props.addOperationCommentThunkCreator}
      />
      <PriceSection
        selectedCurrency={props.selectedCurrency}
        isIncome={props.operation.isIncome}
        itemText={props.itemText}
        moneyAmount={props.operation.moneyAmount}
        operationType={props.operation.operationType}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E9E9E9",
    height: 85,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 17,
    alignItems: "center",
    elevation: 4,
  },
})

export default React.memo(BottomInfo, isEqualMemoComparison)
