// PLUGINS IMPORTS //
import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import ButtonSection from "./ButtonsSection/ButtonsSection"
import PieChart from "./PieChart/PieChart"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null
  isAuthentificated: boolean

  isEditMode: boolean
  isIncome: boolean

  incomeCategoriesList: Array<any>
  expensesCategoriesList: Array<any>

  totalIncome: number | string | number
  totalExpenses: number | string | number
}

const StatsRow: React.FC<PropsType> = (props) => {
  const incomeCategoriesLength = props.incomeCategoriesList.length
  const expensesCategoriesLength = props.expensesCategoriesList.length

  return (
    <View style={styles.container}>
      <View style={styles.content_wrap}>
        {props.incomeCategoriesList && props.expensesCategoriesList && (
          <PieChart
            isIncome={props.isIncome}
            totalIncome={props.totalIncome}
            totalExpenses={props.totalExpenses}
            selectedCurrency={props.selectedCurrency}
            incomeCategoriesList={props.incomeCategoriesList}
            expensesCategoriesList={props.expensesCategoriesList}
          />
        )}

        <ButtonSection
          navigation={props.navigation}
          isAuthentificated={props.isAuthentificated}
          isEditMode={props.isEditMode}
          isIncome={props.isIncome}
          totalIncome={props.totalIncome}
          totalExpenses={props.totalExpenses}
          selectedCurrency={props.selectedCurrency}
          incomeCategoriesLength={incomeCategoriesLength}
          expensesCategoriesLength={expensesCategoriesLength}
        />
      </View>

      <TouchableOpacity
        style={styles.micro}
        onPress={() => props.navigation.navigate("VoiceRecognitionScreen")}
      >
        <FontAwesome name="microphone" size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
  },

  content_wrap: {
    flex: 1,
    alignItems: "center",
  },

  micro: {
    height: 55,
    width: 55,
    borderRadius: 100,
    backgroundColor: "#674ABE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
})

export default React.memo(StatsRow, isEqualMemoComparison)
