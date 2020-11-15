// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Dimensions, StyleSheet } from "react-native"
import { LineChart } from "react-native-chart-kit"

// COMPONENTS IMPORTS //
import renderChartInfo from "./Helpers/renderChartInfo"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  operations: Array<any>
  selectedCategory: any

  selectedCurrency: string
  isIncome: boolean
}

const screenWidth = Dimensions.get("screen").width
const ChartSection: React.FC<PropsType> = (props) => {
  const data = {
    labels: renderChartInfo(
      props.operations,
      props.selectedCategory
    ).labelsArray.slice(0, 8),
    datasets: [
      {
        data: renderChartInfo(props.operations, props.selectedCategory)
          .pricesArray,
        color: () =>
          props.selectedCategory
            ? props.selectedCategory.color
            : props.isIncome
            ? "#01CA5C"
            : "#FF555B",
        strokeWidth: 2,
      },
    ],
  }

  const chartConfig = {
    backgroundGradientFrom: "#F8F8F8",
    backgroundGradientTo: "#F8F8F8",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    barPercentage: 1.2,
    decimalPlaces: 0,
    useShadowColorFromDataset: false,
    propsForBackgroundLines: {
      // strokeWidth: 0,
    },
  }

  const [yLength, setYLength] = useState(0)
  const renderMarginLeft = () => {
    if (yLength < 4) {
      return "-10%"
    } else if (yLength < 6) {
      return "-8%"
    } else {
      return 0
    }
  }

  return (
    <View>
      {data.datasets[0].data.length > 1 && (
        <LineChart
          data={data}
          width={screenWidth}
          height={220}
          chartConfig={chartConfig}
          style={{ marginLeft: renderMarginLeft() }}
          bezier
          transparent
          formatYLabel={(y: string) => {
            setYLength(y.length)
            const iterator = y.length >= 6
            return `${y.slice(0, 6)}${iterator ? ".." : ""}`
          }}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  // chart: { marginLeft: "-5%" },
})

export default React.memo(ChartSection, isEqualMemoComparison)
