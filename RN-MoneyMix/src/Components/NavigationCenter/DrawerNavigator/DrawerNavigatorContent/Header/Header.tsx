// PLUGINS IMPORTS //
import React, { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"
import Firebase from "~/API/FirebaseConfig"
import * as Progress from "react-native-progress"
import { useIsDrawerOpen } from "@react-navigation/drawer"

// COMPONENTS IMPORTS //
import OfflineBadge from "~/Components/Shared/Components/Badges/OfflineBadge/OfflineBadge"
import { getImage } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { MaterialIcons } from "@expo/vector-icons"
import { Feather } from "@expo/vector-icons"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  isOnline: boolean
  storageData: {
    used: number
    limit: number
    isReachedLimit: boolean
  }

  isAuthentificated: boolean
  localUserName: string | null
  avatar: string | null

  setNewAvatarThunkCreator: (newAvatarBlob: Blob) => void
  setAvatarActionCreator: (avatarURI: string) => void
  setOfflinePopup: (offlinePopupVisibility: boolean) => void
}

const Header: React.FC<PropsType> = (props) => {
  const [percentage, setPercentage] = useState(0 as number)
  const { t } = useTranslation()
  const isDrawerOpened = useIsDrawerOpen()

  useEffect(() => {
    if (isDrawerOpened) {
      setTimeout(() => {
        setPercentage(
          Number(props.storageData.used || 0) /
            Number(props.storageData.limit || 0)
        )
      }, 250)
    } else {
      setPercentage(0)
    }
  }, [isDrawerOpened])

  return (
    <View style={styles.container}>
      <View style={styles.icons_row}>
        <View style={styles.credentials_wrap}>
          <TouchableOpacity
            onPress={() =>
              props.isAuthentificated
                ? props.isOnline
                  ? getImage(
                      props.setNewAvatarThunkCreator,
                      false,
                      props.setAvatarActionCreator
                    )
                  : props.setOfflinePopup(true)
                : props.navigation.navigate("PremiumVersionScreen")
            }
          >
            <View style={styles.avatar}>
              <Image
                style={styles.avatar}
                source={
                  props.avatar
                    ? { uri: props.avatar }
                    : require("~/Images/default-avatar.png")
                }
              />
              {!props.isAuthentificated ? (
                <Image
                  source={require("~/Images/star.png")}
                  style={styles.vip_star_img}
                />
              ) : (
                !props.isOnline && <OfflineBadge style={styles.vip_star_img} />
              )}
            </View>
          </TouchableOpacity>

          {props.isAuthentificated ? (
            props.localUserName && (
              <TouchableOpacity>
                <Text style={styles.title}>{props.localUserName}</Text>
              </TouchableOpacity>
            )
          ) : (
            <TouchableOpacity
              onPress={() => props.navigation.navigate("PremiumVersionScreen")}
            >
              <Text style={styles.title}>
                {t("DrawerNavigator.Header.Login")}
              </Text>
            </TouchableOpacity>
          )}
          <Text style={styles.subtitle}>
            {props.isAuthentificated
              ? Firebase.auth().currentUser?.email
              : t("DrawerNavigator.Header.SyncDisabled")}
          </Text>
          {props.isAuthentificated && props.isOnline && (
            <TouchableOpacity
              style={styles.bar_wrapper}
              onPress={() =>
                props.navigation.navigate("StorageSubscriptionsScreen")
              }
            >
              <Progress.Bar
                progress={percentage && percentage}
                color={"white"}
                height={10}
              />
              <Text style={styles.percentage}>
                {Math.round(percentage * 100)} %
              </Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.cloud_icon}>
          {props.isAuthentificated ? (
            !props.isOnline ? (
              <Feather name="wifi-off" size={21} color="orange" />
            ) : (
              <MaterialIcons name="cloud-done" size={24} color="white" />
            )
          ) : (
            <MaterialIcons name="cloud-off" size={24} color="white" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    marginTop: -34,
    paddingTop: 34,
    width: "130%",
    backgroundColor: "#674ABE",
  },

  icons_row: {
    flexDirection: "row",
    marginTop: 14,
  },

  credentials_wrap: {
    flexDirection: "column",
    marginLeft: 16,
    width: "56%",
  },

  avatar: {
    height: 43,
    width: 43,
    backgroundColor: "gray",
    borderRadius: 100,
    marginBottom: 6,
  },

  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
    color: "white",
  },

  subtitle: {
    fontSize: 14,
    lineHeight: 14,
    color: "white",
    marginTop: 10,
  },

  cloud_icon: {
    right: -20,
  },

  vip_star_img: {
    position: "absolute",
    height: 21,
    width: 21,
    right: -6,
    top: -6,
  },

  bar_wrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
  },

  percentage: {
    color: "silver",
    marginTop: -3,
    marginLeft: 10,
  },
})

export default React.memo(Header, isEqualMemoComparison)
