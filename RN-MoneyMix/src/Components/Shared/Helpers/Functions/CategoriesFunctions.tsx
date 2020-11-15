export const initialCategoriesFilter = (
  state: any,
  categoriesArray: Array<any>,
  config: {
    income: boolean
    withDate?: boolean
    lastMonth?: boolean
    dayjs?: any
  }
) => {
  if (config.withDate) {
    return categoriesArray
      .filter((operation: any) => operation.isIncome === config.income)
      .filter((operation: any) => operation.operation !== "Transaction")
      .filter((operation: any) => {
        if (config.lastMonth) {
          return (
            operation.createdAt >=
              Number(
                new Date(
                  config.dayjs().startOf("month").subtract(1, "month") as any
                ).getTime()
              ) &&
            operation.createdAt <=
              Number(
                new Date(
                  config.dayjs().endOf("month").subtract(1, "month") as any
                ).getTime()
              )
          )
        } else {
          if (operation.createdAt) {
            return (
              operation.createdAt >=
                Number(state.GeneralGetState.InitialDate) &&
              operation.createdAt <= Number(state.GeneralGetState.FinalDate)
            )
          } else {
            return operation
          }
        }
      })
      .map((operation: any) => operation.category)
      .filter((category: any) => category.icon)
      .filter((category: any) => category.icon !== "unknown")
  } else {
    return categoriesArray
      .filter((operation: any) => operation.isIncome === config.income)
      .filter((operation: any) => operation.operation !== "Transaction")
      .map((operation: any) => operation.category)
      .filter((category: any) => category.icon)
      .filter((category: any) => category.icon !== "unknown")
  }
}

export const removeCategoriesDuplicates = (originalArray: any, prop: any) => {
  var newArray = [] as any
  var lookupObject = {} as any

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    const FilteredArray = originalArray
      .filter((category: any) => {
        return category.id === lookupObject[i].id
      })
      .filter((category: any) => category.icon)
      .filter((category: any) => category.icon !== "unknown")

    let arr = [] as any
    FilteredArray.forEach(
      (obj: any) =>
        obj &&
        obj.subCategories &&
        arr &&
        (arr = [...arr, ...obj.subCategories])
    )
    const FilteredSubCategories = removeSubCategoriesDuplicates(arr, "id")
    const SubCategoriesTotalPrice = FilteredSubCategories.reduce(
      (prev: any, current: any) => {
        return Number(prev) + Number(current.price)
      },
      0
    )

    const price =
      FilteredArray.reduce((prev: any, current: any) => {
        return Number(prev) + Number(current.price)
      }, 0) + Number(SubCategoriesTotalPrice)

    const budget = FilteredArray.reduce((prev: any, current: any) => {
      return Number(prev) + Number(current.budget)
    }, 0)

    lookupObject[i] &&
      newArray.push({
        ...lookupObject[i],
        price: price,
        budget: budget,
        subCategories: FilteredSubCategories,
      })
  }
  return newArray
}

export const removeSubCategoriesDuplicates = (
  originalArray: any,
  prop: any
) => {
  var newArray = [] as any
  var lookupObject = {} as any

  for (var i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    const price = originalArray
      .filter((subCategory: any) => {
        return subCategory.id === lookupObject[i].id
      })
      .reduce((prev: any, current: any) => {
        return prev + Number(current.price)
      }, 0)

    lookupObject[i] &&
      newArray.push({
        ...lookupObject[i],
        price: price,
      })
  }

  return newArray
}
