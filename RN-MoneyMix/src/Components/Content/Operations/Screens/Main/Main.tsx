// PLUGINS IMPORTS //
import React, { useState, useEffect, useCallback } from "react"
import {
  ScrollView,
  FlatList,
  RefreshControl,
  View,
  Text,
  ActivityIndicator,
  BackHandler,
  StyleSheet,
} from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import SearchSection from "./SearchSection/SearchSection"

import OperationItem from "./Components/OperationItem/OperationItem"
import FilterItem from "../FilterScreen/FilterSection/FilterItem/FilterItem"
import DateBlockItem from "./Components/DateBlockItem/DateBlockItem"
import FilteredBlockInfo from "./Components/FilteredBlockInfo/FilteredBlockInfo"

import {
  FilterOperationsByDate,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
  selectedCurrency: string
  operationsList: Array<any>

  InitialDate: string
  FinalDate: string

  setDateActionCreator: (initialDate: any, finalDate: any) => void
  ChangeOperationDateThunkCreator: (oldOperation: any, newDate: Date) => void
  addOperationCommentThunkCreator: (operation: any, newComment: string) => void
  DuplicateOperationThunkCreator: (operation: any) => void
  DeleteOperationsThunkCreator: (operations: Array<any>) => void
  getOperationsListThunkCreator: (selectedFilters: Array<string>) => any
  getCustomOperationsListThunkCreator: (
    searchValue: string,
    isCategory: boolean
  ) => any
}

const Main: React.FC<PropsType> = (props) => {
  const [loading, setLoading] = useState(true as boolean)
  const [refreshing, setRefreshing] = useState(false as boolean)
  const [selectedOperations, setSelectedOperations] = useState([] as Array<any>)
  const [searchQuery, setSearchQuery] = useState("" as string)
  const { t } = useTranslation()

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    getData()
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButton as any)
    })

    props.navigation.addListener("blur", () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButton as any
      )
    })
  }, [props.navigation])

  const category = props.route.params.category
  const bill = props.route.params.bill

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    getData()
  }, [props.route.params])

  useEffect(() => {
    getData()
  }, [props.InitialDate])

  useEffect(() => {
    getData()
  }, [props.FinalDate])

  useEffect(() => {
    // props.navigation.addListener("focus", () => {
    //   getData();
    // });
    props.navigation.addListener("blur", () => {
      props.navigation.setParams({
        category: null,
        bill: null,
      })
      props.route.params.previousNavigation.setParams({
        category: null,
        bill: null,
      })
    })
  }, [props.navigation])

  const getData = () => {
    category
      ? props
          .getCustomOperationsListThunkCreator(category.id, true)
          .then(() => {
            setRefreshing(false)
            setLoading(false)
          })
      : bill
      ? props
          .getCustomOperationsListThunkCreator(bill.title, false)
          .then(() => {
            setRefreshing(false)
            setLoading(false)
          })
      : props
          .getOperationsListThunkCreator(props.route.params.selectedFilters)
          .then(() => {
            setRefreshing(false)
            setLoading(false)
          })
  }

  useEffect(() => {
    if (props.route.params.allowDeleteOperations) {
      props.DeleteOperationsThunkCreator(selectedOperations)

      props.navigation.setParams({
        selectedOperationsCount: null,
        allowDeleteOperations: false,
      })
      setSelectedOperations([])
    }
  }, [props.route.params.allowDeleteOperations])

  const isSearching = props.route.params.isSearching

  const finalOperations = FilterOperationsByDate(
    props.operationsList,
    searchQuery
  )

  const renderOperationsLength = () => {
    let timesArr = [] as Array<any>

    finalOperations.map((obj: any) => {
      timesArr.push(...obj.times)
    })

    return timesArr.length
  }

  return loading ? (
    <View style={styles.loading_wrapper}>
      <ActivityIndicator color="#674ABE" size={"large"} />
    </View>
  ) : (
    <View style={styles.container}>
      {props.route.params.selectedFilters.length > 0 && (
        <View>
          <FlatList
            horizontal
            data={props.route.params.selectedFilters}
            renderItem={({ item }) => {
              return (
                item && (
                  <FilterItem
                    key={item}
                    title={item}
                    selectedFilters={props.route.params.selectedFilters}
                    containerStyle={styles.filter_item}
                  />
                )
              )
            }}
            contentContainerStyle={styles.filters_wrap}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      )}
      {isSearching && (
        <SearchSection
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      )}
      <ScrollView
        contentContainerStyle={styles.wrapper}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#674ABE"]}
          />
        }
      >
        {category || bill ? (
          <FilteredBlockInfo
            data={category ? category : bill ? bill : null}
            isCategory={category ? true : false}
            selectedCurrency={props.selectedCurrency}
            operationsCount={renderOperationsLength()}
          />
        ) : null}
        <View style={styles.list_wrap}>
          {finalOperations && finalOperations.length > 0 ? (
            finalOperations.map(
              (operationGroup: {
                day: {
                  date: any
                  fromNow: string
                }
                times: Array<{
                  bill: string
                  moneyAmount: number
                  comment: string
                  category: string
                  isIncome: boolean
                  user: string
                  createdAt: string
                  image: string
                  imageStorageID: string
                }>
              }) => {
                let TotalPrice = 0
                const FilteredArray = operationGroup.times.filter(
                  (operation: any) => operation.operation !== "Transaction"
                )
                FilteredArray.map((operation: any) => {
                  TotalPrice = operation.isIncome
                    ? Number(TotalPrice) +
                      Math.abs(Number(operation.moneyAmount))
                    : Number(TotalPrice) -
                      Math.abs(Number(operation.moneyAmount))
                })

                return (
                  <>
                    <DateBlockItem
                      key={String(operationGroup.day)}
                      dayInfo={operationGroup.day}
                      TotalPrice={TotalPrice}
                      selectedCurrency={props.selectedCurrency}
                    />
                    {operationGroup.times
                      .sort((a: any, b: any) => {
                        a = new Date(a.createdAt)
                        b = new Date(b.createdAt)
                        return a > b ? -1 : a < b ? 1 : 0
                      })
                      .map((operation: any) => {
                        return (
                          <OperationItem
                            key={operation.id}
                            navigation={props.navigation}
                            route={props.route}
                            isOnline={props.isOnline}
                            operation={operation}
                            selectedCurrency={props.selectedCurrency}
                            selectedOperations={selectedOperations}
                            setSelectedOperations={setSelectedOperations}
                            ChangeOperationDateThunkCreator={
                              props.ChangeOperationDateThunkCreator
                            }
                            addOperationCommentThunkCreator={
                              props.addOperationCommentThunkCreator
                            }
                            DuplicateOperationThunkCreator={
                              props.DuplicateOperationThunkCreator
                            }
                            DeleteOperationsThunkCreator={
                              props.DeleteOperationsThunkCreator
                            }
                          />
                        )
                      })}
                  </>
                )
              }
            )
          ) : (
            <View style={styles.empty_container}>
              <EmptyListSVG height={225} width={225} />
              <Text style={styles.empty_text}>
                {t("EmptyLists.EmptyOperations")}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 30,
  },

  container: {
    flex: 1,
  },

  filters_wrap: {
    justifyContent: "space-around",
    marginTop: 10,
  },

  filter_item: {
    marginHorizontal: 5,
  },

  empty_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },

  empty_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },

  date: {
    fontSize: 20,
  },

  loading_wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  list_wrap: {
    marginHorizontal: 16,
    flex: 1,
  },
})

export default React.memo(Main, isEqualMemoComparison)
