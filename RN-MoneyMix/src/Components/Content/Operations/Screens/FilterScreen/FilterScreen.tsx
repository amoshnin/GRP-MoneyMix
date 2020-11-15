// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { ScrollView, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import FilterSection from "./FilterSection/FilterSection"
import BottomIcons from "./BottomIcons/BottomIcons"

import {
  concat,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  selectedFilters: Array<any>

  selectedCurrency: string

  normalBillsList: Array<{
    accountBalance: string
    creditLimit: string
    description: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  debtsBillsList: Array<{
    description: string
    iOwe: string
    name: string
    takeIntoTotalBalance: boolean
    totalDebtSum: string
    type: string
  }>

  savingsBillsList: Array<{
    accountBalance: string
    budget: string
    description: string
    goal: string
    name: string
    takeIntoTotalBalance: boolean
    type: string
  }>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  operationsList: Array<any>

  getBillsListsThunkCreator: () => void
  getFullCategoriesListThunkCreator: () => void
}

const FilterScreen: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  const getData = () => {
    props.getBillsListsThunkCreator()
    props.getFullCategoriesListThunkCreator()
  }

  useEffect(() => {
    getData()
  }, [props.navigation])

  useEffect(() => {
    getData()
  }, [])

  const [selectedFilters, setSelectedFilters] = useState(
    props.selectedFilters as Array<string>
  )

  useEffect(() => {
    if (selectedFilters.length > 0) {
      props.navigation.setParams({
        selectedFilters: selectedFilters,
      })
    }
  }, [selectedFilters])

  const TotalBillsList = concat(
    props.normalBillsList,
    props.debtsBillsList,
    props.savingsBillsList
  )

  const namesArray = [
    ...(new Set(
      props.operationsList
        .filter((operation: any) => operation.user)
        .map((operation: any) => operation.user)
    ) as any),
  ].map((user: any) => ({ title: user }))

  return (
    <>
      <ScrollView style={styles.wrapper} showsHorizontalScrollIndicator={false}>
        <FilterSection
          title={t("Operations.FilterScreen.OperationType")}
          itemsArray={[
            {
              title: "Income",
              color: "#01CA5C",
            },
            {
              title: "Expenses",
              color: "#FF3940",
            },
            {
              title: "Transaction",
              color: "gray",
            },
            {
              title: "Balance",
              color: "#86BAF8",
            },
          ]}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        {TotalBillsList && TotalBillsList.length > 0 && (
          <FilterSection
            title={t("BillsScreen.Lists.Bills")}
            itemsArray={TotalBillsList}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
            isBill
          />
        )}

        {props.totalIncomeCategoriesList &&
          props.totalIncomeCategoriesList.length > 0 && (
            <FilterSection
              title={t("Categories.Main.Income")}
              itemsArray={props.totalIncomeCategoriesList}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          )}

        {props.totalExpensesCategoriesList &&
          props.totalExpensesCategoriesList.length > 0 && (
            <FilterSection
              title={t("Categories.Main.Expenses")}
              itemsArray={props.totalExpensesCategoriesList}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          )}

        {namesArray && namesArray.length > 0 && (
          <FilterSection
            title={t("Categories.Main.Names")}
            itemsArray={namesArray}
            selectedFilters={selectedFilters}
            setSelectedFilters={setSelectedFilters}
          />
        )}
      </ScrollView>

      <BottomIcons
        navigation={props.navigation}
        selectedFilters={selectedFilters}
        setSelectedFilters={setSelectedFilters}
      />
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: 16,
    marginTop: 16,
  },

  delete_icon: {
    backgroundColor: "#DB4437",
    height: 50,
    width: 50,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
})

export default React.memo(FilterScreen, isEqualMemoComparison)
