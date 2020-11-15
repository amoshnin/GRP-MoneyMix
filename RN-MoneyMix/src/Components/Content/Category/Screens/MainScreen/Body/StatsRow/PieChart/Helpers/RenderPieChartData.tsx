const renderPieChartData = (
  isIncome: boolean,
  totalIncome: number | string | number,
  totalExpenses: number | string | number,
  incomeCategoriesList: Array<any>,
  expensesCategoriesList: Array<any>
) => {
  let colorScale = [] as Array<any>
  let data = [] as Array<any>

  colorScale = isIncome
    ? incomeCategoriesList.map((obj: any) => obj.color)
    : expensesCategoriesList.map((obj: any) => obj.color)

  if (isIncome) {
    const isEmptyData = Number(totalIncome) <= 0

    if (isEmptyData) {
      data = incomeCategoriesList.map((obj: any) => {
        const value = 1 / incomeCategoriesList.length
        return (
          value !== NaN && {
            y: value,
            x: `${value}%`,
          }
        )
      })
    } else {
      data = incomeCategoriesList
        .filter((x) => x.price > -1)
        .map((obj: any) => {
          if (Number(obj.price) > 0) {
            const value = Number(obj.price) / Math.abs(Number(totalIncome))

            const renderValue = () => {
              if (Number(value) < 0.5 && value > 0) {
                return value + 0.1
              } else {
                return value
              }
            }

            return (
              value !== NaN && {
                y: renderValue(),
                x: `${renderValue()}%`,
              }
            )
          } else {
            return {
              y: 0,
              x: `${0}%`,
            }
          }
        })
    }
  } else {
    const isEmptyData = Number(totalExpenses) <= 0

    if (isEmptyData) {
      data = expensesCategoriesList.map((obj: any) => {
        const value = 1 / expensesCategoriesList.length

        return (
          value !== NaN && {
            y: value,
            x: `${value}%`,
          }
        )
      })
    } else {
      data = expensesCategoriesList
        .filter((x) => x.price > -1)
        .map((obj: any) => {
          if (Number(obj.price) > 0) {
            const value = Number(obj.price) / Math.abs(Number(totalExpenses))

            const renderValue = () => {
              if (Number(value) < 0.5 && value > 0) {
                return value + 0.1
              } else {
                return value
              }
            }

            return (
              value !== NaN && {
                y: renderValue(),
                x: `${renderValue()}%`,
              }
            )
          } else {
            return {
              y: 0,
              x: `${0}%`,
            }
          }
        })
    }
  }

  const filteredArr = () => {
    const cleanedData = data
    return cleanedData
  }

  return {
    colorScale,
    data: filteredArr(),
  }
}

export default renderPieChartData
