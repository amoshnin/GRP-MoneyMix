// PLUGINS IMPORTS //
import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native"
import * as Progress from "react-native-progress"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"
import CategoryDetailsPopup from "~/Components/Shared/Components/Popups/CategoryDetailsPopup/CategoryDetailsPopup"

import {
  renderCategoryTitle,
  renderPrice,
  sliceString,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isIncome: boolean
  selectedCurrency: string | null

  incomeAmount: number | null
  expensesAmount: number | null

  category: any

  defaultBill: any
  operationsList: Array<any>
  setSelectedCategory: (newSelectedCategory: any) => void
}

const windowWidth = Dimensions.get("window").width
const CategoryItem: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  setTimeout(() => {
    if (Number(props.category.price) > 0) {
      if (props.isIncome) {
        setPercentage(Number(props.category.price) / Number(props.incomeAmount))
      } else {
        setPercentage(
          Number(props.category.price) / Number(props.expensesAmount)
        )
      }
    } else {
      setPercentage(0)
    }
  }, 250)

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setPopupVisible(true)}
      >
        <RoundButton
          backgroundColor={props.category.color}
          containerStyle={styles.button}
          onPress={() => setPopupVisible(true)}
        >
          <FontAwesome name={props.category.icon} size={24} color={"white"} />
        </RoundButton>
        <View style={styles.content_wrap}>
          <View style={styles.text_wrap}>
            <Text style={styles.title}>
              {sliceString(
                renderCategoryTitle(props.category.title, t, true),
                18
              )}
            </Text>
            <Text style={{ color: props.category.color }}>
              {renderPrice(props.category.price, props.selectedCurrency, t)}
            </Text>
          </View>

          <Progress.Bar
            progress={percentage && percentage}
            width={windowWidth / 1.65}
            color={props.category.color}
          />
          <Text style={{ color: props.category.color }}>
            {Math.round(percentage * 100)} %
          </Text>
        </View>
      </TouchableOpacity>
      <CategoryDetailsPopup
        navigation={props.navigation}
        isIncome={props.isIncome}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        selectedCurrency={props.selectedCurrency}
        category={props.category}
        billData={props.defaultBill}
        percentage={percentage}
        operationsList={props.operationsList}
        showGraphicsField
        setSelectedCategory={props.setSelectedCategory}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "89%",
    marginLeft: -10,
  },

  content_wrap: {
    marginTop: -5,
  },

  text_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  title: {
    color: "black",
  },

  button: {
    height: 45,
    width: 45,
  },
})

export default React.memo(CategoryItem, isEqualMemoComparison)
