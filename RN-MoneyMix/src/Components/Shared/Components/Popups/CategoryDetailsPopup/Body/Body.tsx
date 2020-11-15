// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import UpperSection from "./UpperSection/UpperSection"
import BottomSection from "./BottomSection/BottomSection"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  category: any
  percentage: number
  selectedCurrency: string | null

  operationsCount: number
  yearPrice: number
  monthPrice: number
}

const Body: React.FC<PropsType> = (props) => {
  return (
    <View style={styles.container}>
      <UpperSection
        selectedCurrency={props.selectedCurrency}
        operationsCount={props.operationsCount}
        percentage={props.percentage}
        color={props.category.color}
        price={props.category.price}
      />
      <BottomSection
        selectedCurrency={props.selectedCurrency}
        yearPrice={props.yearPrice}
        monthPrice={props.monthPrice}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: -5,
  },
})

export default React.memo(Body, isEqualMemoComparison)
