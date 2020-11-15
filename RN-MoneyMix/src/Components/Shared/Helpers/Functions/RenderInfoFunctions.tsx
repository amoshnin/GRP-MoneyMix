import React from "react"
import { shallowEqual } from "react-redux"
import { DefaultCategoriesNames } from "~/Components/Shared/Helpers/Constants/GeneralInfo"

////////////////////////

// General
export const renderProfile = (profileName: string, t: any) => {
  if (profileName === "General") {
    return t(`PremiumVersionScreen.${profileName}`)
  } else {
    return profileName
  }
}

// BILLS INFO
import { FontAwesome } from "@expo/vector-icons"
import { FontAwesome5 } from "@expo/vector-icons"
import { MaterialIcons } from "@expo/vector-icons"
import { MaterialCommunityIcons } from "@expo/vector-icons"

export const renderBillName = (name: string, t: any) => {
  if (name === "Cash") {
    return t("Categories.Main.Cash")
  } else if (name === "Card") {
    return t("Categories.Main.Card")
  } else {
    return name
  }
}

export const renderBillIcon = (type: string, icon?: string, color?: string) => {
  if (icon) {
    return (
      <FontAwesome name={icon} size={24} color={color ? color : "#674ABE"} />
    )
  } else {
    if (type === "NormalBill") {
      return (
        <FontAwesome5
          name="piggy-bank"
          size={24}
          color={color ? color : "#674ABE"}
        />
      )
    } else if (type === "DebtBill") {
      return (
        <MaterialIcons
          name="face"
          size={24}
          color={color ? color : "#674ABE"}
        />
      )
    } else if (type === "SavingsBill") {
      return (
        <MaterialCommunityIcons
          name="bank"
          size={24}
          color={color ? color : "#674ABE"}
        />
      )
    } else {
      return <FontAwesome name="s" size={24} color={"gray"} />
    }
  }
}

export const renderBillMoney = (
  type: string,
  accountBalance?: string,
  iOwe?: string,
  totalDebtSum?: string
) => {
  let value = 0
  if (type === "NormalBill") {
    value = Number(accountBalance) || 0
  } else if (type === "SavingsBill") {
    value = Number(accountBalance) || 0
  } else if (type === "DebtBill") {
    value = Number(totalDebtSum) - Number(iOwe) || 0
  }

  return value
}

// OPERATIONS
import { chain } from "underscore"
import dayjs from "dayjs"
import calendar from "dayjs/plugin/calendar"

export const FilterOperationsByDate = (
  operations: Array<any>,
  searchQuery: string
) => {
  let UniqueOperationsArray = Array.from(new Set(operations))
  UniqueOperationsArray = UniqueOperationsArray.filter(
    (operation: any) => operation.moneyAmount !== 0
  ).filter((operation: any) => operation.bill !== null)

  if (searchQuery.length > 0) {
    if (!searchQuery.trim()) UniqueOperationsArray = UniqueOperationsArray

    UniqueOperationsArray = UniqueOperationsArray.filter(
      (operation) =>
        operation.comment &&
        operation.comment
          .toLowerCase()
          .includes(String(searchQuery).toLowerCase())
    )
  }

  dayjs.extend(calendar)

  var occurrenceDay = (operation: any) => {
    return dayjs(operation.createdAt).startOf("day").format()
  }

  var groupToDay = (group: any, day: any) => {
    return {
      day: {
        date: dayjs(day),
        fromNow: dayjs(day).calendar(null as any, {
          sameDay: "[Today]",
          nextDay: "[Tomorrow]",
          nextWeek: "dddd",
          lastDay: "[Yesterday]",
          lastWeek: "DD/MM/YYYY",
          sameElse: "DD/MM/YYYY",
        }),
      },
      times: group,
    }
  }

  var FinalOperationsList = chain(UniqueOperationsArray)
    .groupBy(occurrenceDay)
    .map(groupToDay)
    .sortBy("day")
    .value()
    .sort((a: any, b: any) => {
      a = new Date(a.day.date)
      b = new Date(b.day.date)
      return a > b ? -1 : a < b ? 1 : 0
    })

  return FinalOperationsList
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const renderCategoryTitle = (
  name: string,
  t: any,
  unSlice?: boolean
) => {
  const renderName = () => {
    if (DefaultCategoriesNames.includes(name)) {
      return t(`Categories.DefaultCategories.${name}`)
    } else {
      return name || ""
    }
  }

  const isIterator = renderName() && renderName().length > 8

  if (unSlice) {
    return renderName()
  } else {
    return `${renderName().slice(0, 8)}${isIterator ? ".." : ""}`
  }
}

export const renderPrice = (
  price: string | number,
  selectedCurrency: string | null,
  t: any,
  unSlice?: boolean,
  sliceCount?: number
) => {
  if (Number(price) % 1 != 0) {
    price = parseFloat(String(price)).toFixed(2)
  }

  if (unSlice) {
    return `${price || 0} ${t(
      `DrawerNavigator.ButtonsList.${selectedCurrency}Currency`
    )}`
  } else {
    const isIterated =
      price && sliceCount
        ? String(price).length > sliceCount
        : String(price).length > 6
    return `${price ? String(price).slice(0, sliceCount || 6) : 0}${
      isIterated ? ".." : ""
    } ${t(`DrawerNavigator.ButtonsList.${selectedCurrency}Currency`)}`
  }
}

export const concat = (...arrays: any) =>
  [].concat(...arrays.filter(Array.isArray))
export const mergeArrays = (arr1: Array<any>, arr2: Array<any>) =>
  arr1 &&
  arr1.map((obj) => (arr2 && arr2.find((p) => p.name === obj.name)) || obj)
export const sum = (array: Array<any>, key: string) => {
  return array.reduce((a, b) => Number(a) + (Number(b[key]) || 0), 0)
}

export const sliceString = (string: string, sliceCount: number) => {
  const word = string.slice(0, sliceCount)
  const isIterator = string.length > sliceCount

  return `${word}${isIterator ? ".." : ""}`
}

export const isEqualMemoComparison = (prevProps: any, nextProps: any) => {
  return shallowEqual(prevProps, nextProps)
}
