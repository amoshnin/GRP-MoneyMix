import Constants from "expo-constants"
import * as Notifications from "expo-notifications"
import * as Permissions from "expo-permissions"
import { useTranslation } from "react-i18next"

///////////////////////////////////////////////////////////////

export const registerForPushNotificationsAsync = async () => {
  let token
  let experienceId = undefined

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    }),
  })

  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    )
    let finalStatus = existingStatus
    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)
      finalStatus = status
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!")
      return
    }

    if (!Constants.manifest) {
      experienceId = "@artem7/monmix"
    }

    token = (
      await Notifications.getExpoPushTokenAsync({
        experienceId,
      })
    ).data

    await Notifications.setBadgeCountAsync(0)
  }

  return token
}

///////////////////////////////////////////////

export const scheduleDailyNotifications = async () => {
  const { t } = useTranslation()
  Notifications.scheduleNotificationAsync({
    content: {
      title: t("Notifications.PPUserNotOpenAppTitle"),
      body: t("Notifications.PPUserNotOpenApp"),
      badge: 1,
      // @ts-ignore
      vibrate: true,
      sound: true,
    },

    trigger: {
      hour: 14,
      minute: 10,
      repeats: true,
    },
  })
}

///////////////////////////////////////////////
