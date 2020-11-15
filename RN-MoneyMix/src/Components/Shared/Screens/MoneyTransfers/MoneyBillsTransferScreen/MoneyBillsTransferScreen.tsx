// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet, BackHandler } from "react-native"

// COMPONENTS IMPORTS //
import TopSection from "./TopSection/TopSection"
import Body from "./Body/Body"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
  isAuthentificated: boolean
  selectedCurrency: string
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  BillsMoneyTransferThunkCreator: (
    firstBillData: any,
    sendingBillData: any,
    newMoneyAmount: string,
    comment: string,
    selectedImages: Array<any>,
    selectedDate: Date
  ) => void
  getBillsListsThunkCreator: () => void
}

const MoneyBillsTransferScreen: React.FC<PropsType> = (props) => {
  const [firstBillData, setFirstBillData] = useState(
    props.route.params.billData
  )
  const [sendingBillData, setSendingBillData] = useState(
    props.route.params.sendingBillData
  )

  const getData = async () => {
    const data = await props.route.params.transData

    data.selectedCategory
      ? setFirstBillData(data.selectedCategory)
      : setFirstBillData(await props.route.params.billData)
    data.selectedBill
      ? setSendingBillData(data.selectedBill)
      : setSendingBillData(await props.route.params.sendingBillData)
  }

  useEffect(() => {
    getData()
  }, [props.route.params])

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    const handleBackButton = () => {
      props.navigation.goBack()
    }

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

  return (
    <View style={styles.wrapper}>
      <TopSection
        firstBillData={firstBillData}
        setSendingBillData={setSendingBillData}
        sendingBillData={sendingBillData}
        selectedCurrency={props.selectedCurrency}
        normalBillsList={props.normalBillsList}
        debtsBillsList={props.debtsBillsList}
        savingsBillsList={props.savingsBillsList}
      />
      <Body
        navigation={props.navigation}
        route={props.route}
        //
        isOnline={props.isOnline}
        isAuthentificated={props.isAuthentificated}
        storageData={props.storageData}
        //
        setFirstBillData={setFirstBillData}
        firstBillData={firstBillData}
        sendingBillData={sendingBillData}
        setSendingBillData={setSendingBillData}
        selectedCurrency={props.selectedCurrency}
        BillsMoneyTransferThunkCreator={props.BillsMoneyTransferThunkCreator}
        getBillsListsThunkCreator={props.getBillsListsThunkCreator}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "white",
    flex: 1,
  },
})

export default React.memo(MoneyBillsTransferScreen, isEqualMemoComparison)
