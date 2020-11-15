import dayjs from "dayjs"

import { sum } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

const renderChartInfo = (operations: Array<any>, category: any) => {
  if (category) {
    operations = operations.filter(
      (operation: any) =>
        operation.category && operation.category.id === category.id
    )
  }

  operations = operations.filter((operation: any) => operation.createdAt)

  const dataList = [
    ...(new Set(
      operations.map((obj: any) => dayjs(obj.createdAt).format("MMMM-DD-YYYY"))
    ) as any),
  ]

  let pricesArray = [] as Array<any>
  let labelsArray = [] as Array<any>

  dataList.forEach((createdAt: string) => {
    const todayOperations = operations.filter(
      (operation: any) =>
        dayjs(operation.createdAt).format("MMMM-DD-YYYY") === createdAt
    )
    const totalTodayMoneyAmount = sum(todayOperations, "moneyAmount")
    pricesArray.push(totalTodayMoneyAmount)

    labelsArray.push(
      ...(new Set(
        operations
          .filter(
            (operation: any) =>
              dayjs(operation.createdAt).format("MMMM-DD-YYYY") === createdAt
          )
          .map(
            (operation: any) =>
              `${dayjs(operation.createdAt).format("DD")}.${dayjs(
                operation.createdAt
              ).format("MM")}`
          )
      ) as any)
    )
  })

  return {
    labelsArray,
    pricesArray: pricesArray.filter((price: string) => Number(price) > 0),
  }
}

export default renderChartInfo
