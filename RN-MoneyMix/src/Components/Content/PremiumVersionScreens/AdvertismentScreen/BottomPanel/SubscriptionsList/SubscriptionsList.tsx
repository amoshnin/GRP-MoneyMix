// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { View, Text, StyleSheet } from "react-native"
import * as RNIap from "react-native-iap"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"
import dayjs from "dayjs"

// COMPONENTS IMPORTS //
import Button from "~/Components/Shared/Components/Buttons/Button/Button"
import { initilizeIAPConnection } from "~/Components/Shared/Helpers/Functions/IAPFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isAuthentificated: boolean

  setNewSubscriptionDataThunkCreator: (
    PremiumFinishDate: string | null,
    productId: string
  ) => void
}

const itemSubs = ["month", "month3", "month6"]
const SubscriptionsList: React.FC<PropsType> = (props) => {
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

  const purchasePremium = async (productId: string, durationMonths: number) => {
    await RNIap.requestSubscription(productId).then(async () => {
      await AsyncStorage.setItem("PremiumProductId", productId)
      if (props.isAuthentificated) {
        props.setNewSubscriptionDataThunkCreator(
          dayjs().add(durationMonths, "month").toString(),
          productId
        )
      } else {
        props.navigation.navigate("RegisterScreen", {
          PremiumFinishDate: dayjs().add(durationMonths, "month").toString(),
          productId,
        })
      }
    })
  }

  return (
    <View style={styles.buttons_wrap}>
      {subscriptions
        .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
        .map((subscription: any) => {
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

          const renderMonths = () => {
            if (subscription.productId === "month3") {
              return 3
            } else if (subscription.productId === "month6") {
              return 6
            } else {
              return 1
            }
          }

          const renderProductId = () => {
            if (subscription.productId === "month") {
              return "month1"
            } else {
              return subscription.productId
            }
          }

          return (
            <View style={styles.btn_item_wrap}>
              <Button
                title={`${Math.round(
                  Number(subscription.price) / renderMonths()
                )} ${renderCurrency()} ${t(
                  "PremiumVersionScreen.BottomPannel.per"
                )} ${t("PremiumVersionScreen.BottomPannel.month")}`}
                containerStyle={[styles.button, { backgroundColor: "#01CA5C" }]}
                textStyle={styles.button_text}
                onPress={() =>
                  purchasePremium(subscription.productId, renderMonths())
                }
                unSliceTitle
              />
              {subscription.productId !== "month" && (
                <Text style={styles.subtitle}>
                  {t(`PremiumVersionScreen.BottomPannel.${renderProductId()}`)}{" "}
                  {t("PremiumVersionScreen.BottomPannel.for")}{" "}
                  {subscription.price} {renderCurrency()}
                </Text>
              )}
            </View>
          )
        })}
    </View>
  )
}

const styles = StyleSheet.create({
  buttons_wrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },

  btn_item_wrap: {
    alignItems: "center",
    marginHorizontal: 10,
  },

  button: {
    width: 156,
    marginBottom: 6,
    elevation: 0,
  },

  button_text: { fontWeight: "bold" },

  subtitle: {
    marginBottom: 20,
    color: "#232323",
    opacity: 0.5,
    fontWeight: "bold",
  },
})

export default React.memo(SubscriptionsList, isEqualMemoComparison)
