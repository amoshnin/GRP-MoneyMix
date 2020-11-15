// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { VictoryPie } from "victory-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import renderPieChartData from "./Helpers/RenderPieChartData"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null

  isIncome: boolean

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  totalIncome: number | string | number
  totalExpenses: number | string | number
}

const PieChart: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const filteredIncomeCategoriesList = props.incomeCategoriesList.filter(
    (obj: any) => !obj.archived
  )
  const filteredExpensesCategoriesList = props.expensesCategoriesList.filter(
    (obj: any) => !obj.archived
  )
  const { colorScale, data } = renderPieChartData(
    props.isIncome,
    props.totalIncome,
    props.totalExpenses,
    filteredIncomeCategoriesList,
    filteredExpensesCategoriesList
  )

  const Currency = t(
    `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
  )
  const yArr = data
    .filter((obj: any) => obj.y !== Infinity)
    .filter((obj: any) => !isNaN(obj.y))

  return (
    <View style={styles.container}>
      {data && data.length > 0 && yArr.length > 0 ? (
        <>
          <Text
            style={[
              styles.text,
              Currency.length > 1 && {
                fontSize: 20,
                left: "34%",
                top: "46%",
              },
              props.isIncome ? { color: "#01CA5C" } : { color: "#FF555B" },
            ]}
          >
            {Currency}
          </Text>
          <VictoryPie
            data={data}
            colorScale={colorScale}
            width={210}
            height={140}
            animate={{
              duration: 1200,
            }}
            standalone
            labelRadius={({ innerRadius }) => (innerRadius as any) + 5}
            radius={({ datum }) =>
              12 * 3 + (datum.y < 0.1 ? datum.y + 0.1 : datum.y) * 30
            }
            innerRadius={22}
            // padAngle={({ datum }) => datum.y * 5}
            style={{
              labels: { display: "none" },
              parent: {
                right: "5%",
              },
            }}
          />
        </>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 220,
    height: 120,
    marginBottom: 35,
    marginRight: 15,
  },

  text: {
    position: "absolute",
    top: "40%",
    left: "38%",
    fontSize: 33,
  },
})

export default React.memo(PieChart, isEqualMemoComparison)
