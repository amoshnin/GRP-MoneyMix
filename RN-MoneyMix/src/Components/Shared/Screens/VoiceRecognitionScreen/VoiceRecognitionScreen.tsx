// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

// COMPONENTS IMPORTS //
import RecognitionResultBlock from "./RecognitionResultBlock/RecognitionResultBlock"
import Body from "./Body/Body"
import BottomSection from "./BottomSection/BottomSection"
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
  recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }

  normalBillsList: Array<any>
  debtsBillsList: Array<any>
  savingsBillsList: Array<any>

  totalIncomeCategoriesList: Array<any>
  totalExpensesCategoriesList: Array<any>

  setRecognitionDataActionCreator: (recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }) => void
  recogniseTextThunkCreator: (text: string, t: any) => void
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
  getFullCategoriesListThunkCreator: () => void
}

const VoiceRecognitionScreen: React.FC<PropsType> = (props) => {
  const [recognitionError, setRecognitionError] = useState(false as boolean)
  const [isRecording, setIsRecording] = useState(false as boolean)
  const [voiceState, setVoiceState] = useState({
    recognized: false as boolean,
    results: [],
    partialResults: [],
  })

  const verifyRecognitionError = () => {
    if (isRecording) {
      setRecognitionError(false)
    }

    if (
      Object.values(props.recognitionInfo.bill).length > 0 &&
      Object.values(props.recognitionInfo.category).length > 0
    ) {
      setRecognitionError(false)
    } else if (!isRecording) {
      setRecognitionError(true)
    }
  }
  useEffect(() => {
    verifyRecognitionError()
  }, [props.recognitionInfo])

  useEffect(() => {
    verifyRecognitionError()
  }, [isRecording])

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <RecognitionResultBlock
          navigation={props.navigation}
          recognitionInfo={props.recognitionInfo}
          recognitionError={recognitionError}
          selectedCurrency={props.selectedCurrency}
          normalBillsList={props.normalBillsList}
          debtsBillsList={props.debtsBillsList}
          savingsBillsList={props.savingsBillsList}
          totalIncomeCategoriesList={props.totalIncomeCategoriesList}
          totalExpensesCategoriesList={props.totalExpensesCategoriesList}
          setRecognitionDataActionCreator={
            props.setRecognitionDataActionCreator
          }
          getFullCategoriesListThunkCreator={
            props.getFullCategoriesListThunkCreator
          }
        />
        <Body
          navigation={props.navigation}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          voiceState={voiceState}
          setVoiceState={setVoiceState}
          categoryTitleExample={
            props.totalExpensesCategoriesList[0] &&
            props.totalExpensesCategoriesList[0].title
          }
          billTitleExample={
            props.normalBillsList[0] && props.normalBillsList[0].name
          }
          recogniseTextThunkCreator={props.recogniseTextThunkCreator}
        />
        <BottomSection
          navigation={props.navigation}
          route={props.route}
          //
          isOnline={props.isOnline}
          isAuthentificated={props.isAuthentificated}
          storageData={props.storageData}
          //
          recognitionInfo={props.recognitionInfo}
          setRecognitionDataActionCreator={
            props.setRecognitionDataActionCreator
          }
          CategoryMoneyTransferThunkCreator={
            props.CategoryMoneyTransferThunkCreator
          }
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    marginBottom: 27,
    marginTop: 45,
    alignItems: "center",
    justifyContent: "center",
  },
})

export default React.memo(VoiceRecognitionScreen, isEqualMemoComparison)
