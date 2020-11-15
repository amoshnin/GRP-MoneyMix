// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import { renderPrice } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  selectedCurrency: string | null

  yearPrice: number
  monthPrice: number
}

const BottomSection: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <Text style={styles.date_text}>
          {t("PremiumVersionScreen.BottomPannel.for")}{" "}
          {t(
            `Header.Months.${dayjs().startOf("month").format("MMMM")}`
          ).toLowerCase()}{" "}
          {dayjs().startOf("month").format("YYYY").toLowerCase()}
        </Text>
        <Text style={styles.date_text}>
          {renderPrice(props.monthPrice, props.selectedCurrency, t)}
        </Text>
      </View>
      <View style={styles.date}>
        <Text style={styles.date_text}>
          {t("PremiumVersionScreen.BottomPannel.for")}{" "}
          {dayjs().startOf("year").format("YYYY").toLowerCase()}
        </Text>
        <Text style={styles.date_text}>
          {renderPrice(props.yearPrice, props.selectedCurrency, t)}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },

  date: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 3,
  },

  date_text: {
    opacity: 0.6,
    color: "black",
  },
})

export default BottomSection
