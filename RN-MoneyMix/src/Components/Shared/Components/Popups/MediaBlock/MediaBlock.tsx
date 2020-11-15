// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import CameraSelectPopup from "~/Components/Shared/Components/Popups/CameraSelectPopup/CameraSelectPopup"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"
import OfflineBadge from "../../Badges/OfflineBadge/OfflineBadge"
import StorageLimitBadge from "~/Components/Shared/Components/Badges/StorageLimitBadge/StorageLimitBadge"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  navigationDest: string

  isAuthentificated: boolean
  isOnline: boolean
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  selectedImages: Array<any>
  setSelectedImages: (selectedImages: any) => void

  selectedCategory: any
  selectedBill: any
  comment: string
  moneyAmount: string
  isIncome: boolean
}

const MediaBlock: React.FC<PropsType> = (props) => {
  const [offlinePopup, setOfflinePopup] = useState(false as boolean)
  const [storageLimitPopupVisible, setStorageLimitPopupVisible] = useState(
    false
  )
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const { t } = useTranslation()

  return (
    <>
      <BlockItem
        containerStyle={styles.container}
        icon={
          <>
            <FontAwesome name="camera" size={24} color="#674ABE" />
            {!props.isAuthentificated ? (
              <Image
                style={styles.unAuth_camera_badge}
                source={require("~/Images/star.png")}
              />
            ) : !props.isOnline ? (
              <OfflineBadge style={styles.unAuth_camera_badge} iconSize={11} />
            ) : props.storageData.isReachedLimit ? (
              <StorageLimitBadge
                style={styles.unAuth_camera_badge}
                iconSize={10}
              />
            ) : (
              props.selectedImages.length > 0 && (
                <View
                  style={[
                    styles.camera_badge,
                    props.selectedImages.length < 3
                      ? { backgroundColor: "#3cba54" }
                      : { backgroundColor: "#DB4437" },
                  ]}
                >
                  <Text style={styles.camera_badge_text}>
                    {props.selectedImages.length}
                  </Text>
                </View>
              )
            )}
          </>
        }
        onPress={() => {
          if (props.isAuthentificated) {
            if (props.isOnline) {
              if (props.storageData.isReachedLimit) {
                setStorageLimitPopupVisible(true)
              } else {
                props.selectedImages.length < 3 && setPopupVisible(true)
              }
            } else {
              setOfflinePopup(true)
            }
          } else {
            props.navigation.navigate("PremiumVersionScreen")
          }
        }}
        isGray
      />
      <CameraSelectPopup
        navigation={props.navigation}
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        navigationDest={props.navigationDest}
        //
        selectedImages={props.selectedImages}
        setSelectedImages={props.setSelectedImages}
        //
        selectedCategory={props.selectedCategory}
        selectedBill={props.selectedBill}
        comment={props.comment}
        moneyAmount={props.moneyAmount}
        isIncome={props.isIncome}
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
    flex: 1,
  },

  text: {
    color: "black",
  },

  camera_badge: {
    position: "absolute",
    top: 7,
    right: 10,
    borderRadius: 100,
    height: 19,
    width: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  camera_badge_text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 13.5,
  },

  unAuth_camera_badge: {
    position: "absolute",
    top: 7,
    right: 10,
    width: 20,
    height: 20,
  },
})

export default React.memo(MediaBlock, isEqualMemoComparison)
