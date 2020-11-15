// PLUGINS IMPORTS //
import React, { useState } from "react"
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native"
import * as Progress from "react-native-progress"
import * as Animatable from "react-native-animatable"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import RoundButton from "~/Components/Shared/Components/Buttons/RoundButton/RoundButton"

import {
  renderCategoryTitle,
  renderBillName,
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCurrency: string | null

  field: any

  isIncome: boolean | undefined
  isBill: boolean | undefined
}

const screenWidth = Dimensions.get("screen").width
const CategoryItem: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)
  const { t } = useTranslation()

  setTimeout(() => {
    setPercentage(
      Number(props.isBill ? props.field.accountBalance : props.field.price) /
        Number(props.field.budget)
    )
  }, 130)

  return (
    <TouchableOpacity
      onPress={() =>
        props.navigation.navigate("MoneyBudgetTransferScreen", {
          isIncome: props.isIncome,
          isSavingsBill: props.isBill,
          data: props.field,
        })
      }
    >
      <Animatable.View
        animation={"fadeIn"}
        delay={0.1}
        style={styles.container}
      >
        <RoundButton
          backgroundColor={props.isBill ? "#674ABE" : props.field.color}
          containerStyle={styles.round_button}
        >
          {props.isBill ? (
            <MaterialCommunityIcons name="bank" size={24} color="white" />
          ) : (
            <FontAwesome name={props.field.icon} size={24} color={"white"} />
          )}
        </RoundButton>
        <View style={styles.content_wrap}>
          <View style={styles.text_wrap}>
            <Text>
              {renderBillName(props.field.name, t) ||
                renderCategoryTitle(props.field.title, t, true)}
            </Text>
            <Text
              style={[
                styles.budget,
                props.isBill
                  ? { color: "#fda623" }
                  : props.isIncome
                  ? { color: "#01CA5C" }
                  : { color: "#FF555B" },
              ]}
            >
              {renderPrice(props.field.budget, props.selectedCurrency, t, true)}
            </Text>
          </View>

          <Progress.Bar
            progress={percentage && percentage}
            width={screenWidth / 1.46}
            color={props.isBill ? "#674ABE" : props.field.color}
          />

          <Text
            style={[
              styles.budget,
              {
                color: props.isBill ? "#674ABE" : props.field.color,
                marginTop: 1,
              },
            ]}
          >
            {Math.round(Number(percentage) * 100)}%
          </Text>
        </View>
      </Animatable.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  content_wrap: {
    marginTop: 2,
    marginHorizontal: 17,
  },

  budget: {
    fontWeight: "bold",
  },

  text_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: screenWidth / 1.46,
    marginBottom: 7,
  },

  round_button: {
    height: 45,
    width: 45,
  },
})

export default React.memo(CategoryItem, isEqualMemoComparison)
