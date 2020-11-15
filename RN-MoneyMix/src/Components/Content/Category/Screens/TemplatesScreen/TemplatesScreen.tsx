// PLUGINS IMPORTS //
import React, { useEffect, useState, useCallback } from "react"
import { RefreshControl, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import TemplateItem from "./TemplateItem/TemplateItem"
import { FlatList } from "react-native-gesture-handler"

import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  selectedCurrency: string | null
  TemplatesArray: Array<{
    templateTitle: string
    isIncome: boolean
    category: any
    bill: any
    newMoneyAmount: number | string
    comment: string
    selectedImages: Array<any>
    selectedDate: Date | string | null
    selectedSubCategory: any
    ID: string
  }>

  getTemplatesArrayThunkCreator: () => any
  deleteTemplateThunkCreator: (template: any) => void
  CategoryMoneyTransferThunkCreator: (
    isIncome: boolean,
    categoryData: any,
    selectedSubCategory: any,
    selectedBill: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: string
  ) => void
}

const TemplatesScreen: React.FC<PropsType> = (props) => {
  const [refreshing, setRefreshing] = useState(false as boolean)

  const getData = () => {
    props.getTemplatesArrayThunkCreator().then(() => setRefreshing(false))
  }

  useEffect(() => {
    getData()
  }, [])

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  return (
    <FlatList
      data={props.TemplatesArray}
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={["#674ABE"]}
        />
      }
      renderItem={({ item }) => {
        return (
          <TemplateItem
            key={item.templateTitle}
            navigation={props.navigation}
            template={item}
            selectedCurrency={props.selectedCurrency}
            deleteTemplateThunkCreator={props.deleteTemplateThunkCreator}
            CategoryMoneyTransferThunkCreator={
              props.CategoryMoneyTransferThunkCreator
            }
          />
        )
      }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    paddingBottom: 35,
  },
})

export default React.memo(TemplatesScreen, isEqualMemoComparison)
