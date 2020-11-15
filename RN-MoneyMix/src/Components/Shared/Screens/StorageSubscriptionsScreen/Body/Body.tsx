// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, Dimensions, StyleSheet } from "react-native"
import * as Progress from "react-native-progress"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }
}
const barWidth = Dimensions.get("screen").width
const Body: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)
  const { t } = useTranslation()

  setTimeout(() => {
    setPercentage(
      Number(props.storageData.used) / Number(props.storageData.limit)
    )
  }, 250)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {Math.round(percentage * 100) >= 100
          ? t("StorageSubscriptions.PPBody")
          : t("StorageSubscriptions.PPBodyUnused")}
      </Text>
      <View style={styles.bar_wrap}>
        <Progress.Bar
          progress={percentage && percentage}
          color={"#01CA5C"}
          height={15}
          width={barWidth / 1.12}
          style={styles.bar}
        />
        <Text style={styles.percentage}>{Math.round(percentage * 100)} %</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
  },

  text: {
    textAlign: "center",
    marginVertical: 10,
    fontSize: 16,
    color: "black",
  },

  bar_wrap: {
    alignItems: "center",
    width: "100%",
    flex: 1,
  },

  bar: {
    marginTop: 20,
  },

  percentage: {
    fontSize: 16,
    marginTop: 7,
  },
})

export default React.memo(Body, isEqualMemoComparison)
