// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { View, StyleSheet } from "react-native"
import dayjs from "dayjs"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SectionBlock from "./SectionBlock/SectionBlock"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  selectedCategory: any
  isIncome: boolean

  operationsList: Array<any>
  selectedCurrency: string | null

  setLoading: (loadingStatus: boolean) => void
}

const MiddleStatsSection: React.FC<PropsType> = (props) => {
  const [TodayPrice, setTodayPrice] = useState(0 as number)
  const [weekPrice, setWeekPrice] = useState(0 as number)
  const [averageDayPrice, setAverageDayPrice] = useState(0 as number)

  let now = dayjs()
  const { t } = useTranslation()

  const getData = async () => {
    let operationsArray = [] as Array<any>

    if (props.selectedCategory) {
      props.operationsList
        .filter(
          (operation: any) =>
            operation.category &&
            operation.category.id === props.selectedCategory.id
        )
        .map((operation: any) => {
          operationsArray = [
            ...operationsArray,
            {
              createdAt: operation.createdAt,
              moneyAmount: operation.moneyAmount,
            },
          ]
        })
    } else {
      props.operationsList.map((operation: any) => {
        operationsArray = [
          ...operationsArray,
          {
            createdAt: operation.createdAt,
            moneyAmount: operation.moneyAmount,
          },
        ]
      })
    }

    const CurrentDate = dayjs().format("DD-MM-YYYY")
    let CurrentWeek = now.subtract(7, "day")

    operationsArray.map((operation: any) => {
      if (dayjs(operation.createdAt).format("DD-MM-YYYY") === CurrentDate) {
        const CleanedArray =
          operationsArray &&
          operationsArray.filter((operation: any) => {
            return (
              dayjs(operation.createdAt).format("DD-MM-YYYY") === CurrentDate
            )
          })

        let TempTodayPrice = 0
        CleanedArray.forEach((cleanedOperation: any) => {
          TempTodayPrice =
            Number(TempTodayPrice) + Number(cleanedOperation.moneyAmount)
        })
        setTodayPrice(TempTodayPrice)
      }

      if (
        dayjs(dayjs(CurrentWeek).format("YYYY-MM-DD")).isBefore(
          dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
        )
      ) {
        const CleanedArray =
          operationsArray &&
          operationsArray.filter((operation: any) => {
            return dayjs(dayjs(CurrentWeek).format("YYYY-MM-DD")).isBefore(
              dayjs(dayjs(operation.createdAt).format("YYYY-MM-DD"))
            )
          })

        let TempWeekPrice = 0
        CleanedArray.forEach((cleanedOperation: any) => {
          TempWeekPrice =
            Number(TempWeekPrice) + Number(cleanedOperation.moneyAmount)
        })

        setWeekPrice(TempWeekPrice)
      }
    })

    let TotalOperationsPrice = 0

    operationsArray.map((operation: any) => {
      TotalOperationsPrice =
        Number(TotalOperationsPrice) + Number(operation.moneyAmount)
    })

    const SameValuesObject = operationsArray
      .map((operation: any) => dayjs(operation.createdAt).format("DD-MM-YYYY"))
      .reduce((acc: any, o: any) => ((acc[o] = (acc[o] || 0) + 1), acc), {})

    const SameValuesLength = Object.keys(SameValuesObject).length
    setAverageDayPrice(Math.round(TotalOperationsPrice / SameValuesLength))
  }

  useEffect(() => {
    getData()
  }, [props.isIncome])

  useEffect(() => {
    setAverageDayPrice(0)
    setTodayPrice(0)
    setWeekPrice(0)
    getData()
  }, [props.operationsList])

  return (
    <View style={styles.container}>
      <SectionBlock
        title={t("StatsScreen.DayAvg")}
        value={`${averageDayPrice || 0} ${t(
          `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
        )}`}
      />
      <SectionBlock
        title={t("StatsScreen.Today")}
        value={`${TodayPrice} ${t(
          `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
        )}`}
      />
      <SectionBlock
        title={t("StatsScreen.Week")}
        value={`${weekPrice} ${t(
          `DrawerNavigator.ButtonsList.${props.selectedCurrency}Currency`
        )}`}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: -17,

    marginTop: 12,
    marginBottom: 16,
  },
})

export default React.memo(MiddleStatsSection, isEqualMemoComparison)
