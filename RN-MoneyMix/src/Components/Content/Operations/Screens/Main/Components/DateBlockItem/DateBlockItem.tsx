// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import {
  renderPrice,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  dayInfo: {
    date: string
    fromNow: string
  }
  TotalPrice: number
  selectedCurrency: string
}

const DateBlockItem: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View>
        <Text size={20}>
          {t(`Header.Months.${dayjs(props.dayInfo.date).format("MMMM")}`)}
        </Text>
        <Text size={20}>
          {props.dayInfo.fromNow.includes("/")
            ? props.dayInfo.fromNow
            : t(`Operations.Popup.Days.${props.dayInfo.fromNow}`)}
        </Text>
      </View>
      <Text
        style={styles.price}
        color={props.TotalPrice > 0 ? "#01CA5C" : "#FF555B"}
      >
        {`${props.TotalPrice > 0 ? "+" : ""} ${renderPrice(
          props.TotalPrice,
          props.selectedCurrency,
          t,
          true
        )}`}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  price: {
    fontWeight: "bold",
    fontSize: 20,
  },
})

export default React.memo(DateBlockItem, isEqualMemoComparison)
