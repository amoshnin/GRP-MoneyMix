// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import * as RNIap from "react-native-iap"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"

import { initilizeIAPConnection } from "~/Components/Shared/Helpers/Functions/IAPFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  setStorageLimitThunkCreator: (newStorageLimit: string) => void
}

const itemSubs = ["storage5", "storage10"]
const BottomSubscriptions: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)
  const [subscriptions, setSubscriptions] = useState([] as Array<any>)
  const { t } = useTranslation()

  const getItems = async () => {
    try {
      const subscriptions = await RNIap.getSubscriptions(itemSubs)

      setSubscriptions(subscriptions)
    } catch (err) {
      console.warn(err.code, err.message)
    }
  }

  useEffect(() => {
    initilizeIAPConnection(getItems)
  }, [])

  const purchase = async (productId: string) => {
    await RNIap.requestSubscription(productId).then(async () => {
      props.setStorageLimitThunkCreator(productId)
    })
  }

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setPopupVisible(true)}>
          <Text style={styles.title}>{t("StorageSubscriptions.WhyPaid")}</Text>
        </TouchableOpacity>
        <View style={styles.buttons_wrap}>
          {subscriptions.map((subscription: any) => {
            const renderCurrency = () => {
              if (subscription.currency === "EUR") {
                return t(`DrawerNavigator.ButtonsList.EuroCurrency`)
              } else if (subscription.currency === "RUB") {
                return t(`DrawerNavigator.ButtonsList.RusRubleCurrency`)
              } else if (subscription.currency === "AUD ") {
                return t(`DrawerNavigator.ButtonsList.AustrDollarCurrency`)
              } else if (subscription.currency === "USD ") {
                return t(`DrawerNavigator.ButtonsList.USDollarCurrency`)
              } else if (subscription.currency === "GBP ") {
                return t(`DrawerNavigator.ButtonsList.BritishFuntCurrency`)
              } else if (subscription.currency === "CAD ") {
                return t(`DrawerNavigator.ButtonsList.CanadianDollarCurrency`)
              } else if (subscription.currency === "CNY ") {
                return t(`DrawerNavigator.ButtonsList.ChineseYuanCurrency`)
              } else if (subscription.currency === "CHF ") {
                return t(`DrawerNavigator.ButtonsList.SwissFrankCurrency`)
              } else {
                return subscription.currency
              }
            }

            return (
              <Button
                title={`${subscription.price} ${renderCurrency()} ${t(
                  "PremiumVersionScreen.BottomPannel.for"
                )} ${String(subscription.productId).replace(
                  "storage",
                  ""
                )} GB ${t("PremiumVersionScreen.BottomPannel.per")} ${t(
                  "PremiumVersionScreen.BottomPannel.month"
                )}`}
                containerStyle={styles.button}
                textStyle={styles.button_text}
                onPress={() => purchase(subscription.productId)}
                unSliceTitle
              />
            )
          })}
        </View>

        <Button
          title={t("StorageSubscriptions.DeletePhotos")}
          containerStyle={styles.del_button}
          onPress={() => props.navigation.navigate("PhotosMultipleGallery")}
          unSliceTitle
        />
      </View>

      <AlertPopup
        popupVisible={popupVisible}
        setPopupVisible={setPopupVisible}
        title={t("StorageSubscriptions.StorageSubscriptions")}
        content={<Text>{t("StorageSubscriptions.PPExplanation")}</Text>}
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
  },

  title: {
    fontSize: 20,
    textAlign: "center",
    marginBottom: 27,
  },

  buttons_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    backgroundColor: "#674ABE",
  },

  button_text: {
    fontSize: 14,
    textAlign: "center",
  },

  del_button: {
    backgroundColor: "#FF555B",
    width: "100%",
    marginVertical: 18,
  },
})

export default React.memo(BottomSubscriptions, isEqualMemoComparison)
