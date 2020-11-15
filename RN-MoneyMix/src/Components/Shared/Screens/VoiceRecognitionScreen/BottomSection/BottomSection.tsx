// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Image, Text, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import ButtonItem from "../Components/ButtonItem/ButtonItem"
import CameraSelectPopup from "~/Components/Shared/Components/Popups/CameraSelectPopup/CameraSelectPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import OfflineBadge from "~/Components/Shared/Components/Badges/OfflineBadge/OfflineBadge"
import StorageLimitBadge from "~/Components/Shared/Components/Badges/StorageLimitBadge/StorageLimitBadge"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"
import { AntDesign } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any

  isOnline: boolean
  isAuthentificated: boolean
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

  setRecognitionDataActionCreator: (recognitionInfo: {
    isIncome: boolean
    bill: any
    category: any
    moneyAmount: number | string
  }) => void
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

const BottomSection: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [alertPopupData, setAlertPopupData] = useState({
    visible: false,
    text: null as string | null,
  })
  const [storageLimitPopupVisible, setStorageLimitPopupVisible] = useState(
    false
  )
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [selectedImages, setSelectedImages] = useState([] as Array<Blob>)
  const { t } = useTranslation()

  useEffect(() => {
    const getData = async () => {
      const data: {
        selectedCategory: any
        selectedBill: any
        selectedImages: Array<any>
        comment: string
        moneyAmount: string | null
        isIncome: boolean | null
      } = await props.route.params.transData

      setSelectedImages(data.selectedImages)

      props.setRecognitionDataActionCreator({
        category: data.selectedCategory || {},
        bill: data.selectedBill || {},
        isIncome: data.isIncome || (false as boolean),
        moneyAmount: data.moneyAmount || 0,
      })
    }

    getData()
  }, [props.route.params.transData])

  const submitOperation = () => {
    if (
      Object.values(props.recognitionInfo.bill).length > 0 &&
      Object.values(props.recognitionInfo.category).length > 0
    ) {
      if (Number(props.recognitionInfo.moneyAmount) > 0) {
        props.CategoryMoneyTransferThunkCreator(
          props.recognitionInfo.isIncome,
          props.recognitionInfo.category,
          null,
          props.recognitionInfo.bill,
          props.recognitionInfo.moneyAmount as string,
          "",
          selectedImages,
          String(new Date(dayjs() as any))
        )
        props.navigation.goBack()
      } else {
        setAlertPopupData({
          visible: true,
          text: `${t("MoneyCategoriesTransferScreen.Popups.PPAlertEmptySum")}!`,
        })
      }
    } else {
      setAlertPopupData({
        visible: true,
        text: `${t(
          "MoneyCategoriesTransferScreen.Popups.PPUnselectedCategoryOrBill"
        )}!`,
      })
    }
  }

  return (
    <>
      <View style={styles.container}>
        <ButtonItem
          backgroundColor="#db3236"
          onPress={() => props.navigation.goBack()}
        >
          <AntDesign name="close" size={24} color="white" />
        </ButtonItem>
        <ButtonItem
          borderColor="#674ABE"
          onPress={() => {
            if (props.isAuthentificated) {
              if (props.isOnline) {
                if (props.storageData.isReachedLimit) {
                  setStorageLimitPopupVisible(true)
                } else {
                  selectedImages.length < 3 && setPopupVisible(true)
                }
              } else {
                setOfflinePopup(true)
              }
            } else {
              props.navigation.navigate("PremiumVersionScreen")
            }
          }}
        >
          <Feather name="camera" size={24} color="#674ABE" />
          {!props.isAuthentificated ? (
            <View style={styles.star_wrap}>
              <Image
                source={require("~/Images/star.png")}
                style={styles.star}
              />
            </View>
          ) : !props.isOnline ? (
            <OfflineBadge style={styles.offline_badge} />
          ) : props.storageData.isReachedLimit ? (
            <StorageLimitBadge style={styles.offline_badge} />
          ) : (
            selectedImages.length > 0 && (
              <View
                style={[
                  styles.badge,
                  selectedImages.length < 3
                    ? { backgroundColor: "#3cba54" }
                    : { backgroundColor: "#DB4437" },
                ]}
              >
                <Text style={styles.badge_text}>{selectedImages.length}</Text>
              </View>
            )
          )}
        </ButtonItem>
        <ButtonItem backgroundColor="#3cba54" onPress={submitOperation}>
          <AntDesign name="check" size={24} color="white" />
        </ButtonItem>
      </View>
      <AlertPopup
        popupVisible={alertPopupData.visible}
        setPopupVisible={(popupVisibility: boolean) =>
          setAlertPopupData({
            text: alertPopupData.text,
            visible: popupVisibility,
          })
        }
        title={t(
          "MoneyCategoriesTransferScreen.Popups.OperationSubmissionError"
        )}
        content={<Text style={styles.text}>{alertPopupData.text}</Text>}
        removeCancelBtn
      />
      <CameraSelectPopup
        navigation={props.navigation}
        navigationDest={"VoiceRecognitionScreen"}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        isIncome={props.recognitionInfo.isIncome}
        moneyAmount={props.recognitionInfo.moneyAmount as string}
        selectedBill={props.recognitionInfo.bill}
        selectedCategory={props.recognitionInfo.category}
        selectedImages={selectedImages}
        setSelectedImages={setSelectedImages}
        comment={""}
      />

      <AlertPopup
        popupVisible={offlinePopup}
        setPopupVisible={setOfflinePopup}
        title={t("GeneralPhrases.Popups.TitleNetProblem")}
        content={
          <Text style={styles.text}>
            {t("GeneralPhrases.Popups.PPNetworkProblem")}
          </Text>
        }
        removeCancelBtn
      />

      <AlertPopup
        popupVisible={storageLimitPopupVisible}
        setPopupVisible={setStorageLimitPopupVisible}
        title={t("StorageSubscriptions.TitleExceed")}
        content={
          <Text style={styles.text}>{t("StorageSubscriptions.PPBody")}</Text>
        }
        cancelButtonText={t("StorageSubscriptions.UpgradePlan")}
        cancelFunction={async () => {
          await setStorageLimitPopupVisible(false)
          await props.navigation.navigate("StorageSubscriptionsScreen")
        }}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "88%",
  },

  badge: {
    borderRadius: 100,
    position: "absolute",
    top: 0,
    right: 0,
    height: 20,
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  badge_text: {
    color: "white",
  },

  star_wrap: {
    backgroundColor: "#674ABE",
    borderRadius: 100,
    position: "absolute",
    padding: 3.7,
    right: 0,
    top: -5.5,
    zIndex: 1,
  },

  star: {
    height: 14.5,
    width: 14.5,
  },

  offline_badge: {
    right: -6,
    top: -6,
  },

  text: {
    color: "black",
  },
})

export default React.memo(BottomSection, isEqualMemoComparison)
