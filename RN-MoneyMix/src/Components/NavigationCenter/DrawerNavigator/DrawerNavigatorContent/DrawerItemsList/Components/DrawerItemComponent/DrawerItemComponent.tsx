// PLUGINS IMPORTS //
import React, { useState } from "react"
import { View, Text, Image, StyleSheet } from "react-native"
import { BaseButton } from "react-native-gesture-handler"
import { Switch } from "react-native-paper"

// COMPONENTS IMPORTS //
import PopupContent from "../PopupContent/PopupContent"
import OfflineBadge from "~/Components/Shared/Components/Badges/OfflineBadge/OfflineBadge"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  onPress: () => void

  icon: any
  title: string
  subtitle?: string

  clearAttributes?: boolean
  switchUsed?: boolean
  vipOption?: boolean
  isOffline?: boolean

  setOfflinePopupVisible?: any
  setDataFunction?: any

  switchValue?: boolean
  setSwitchValue?: any

  popupContent?: {
    title: string
    fields: Array<string>
  }

  storageName?: string
  getValues?: any
}

const DrawerItemComponent: React.FC<PropsType> = (props) => {
  const [popupVisible, setPopupVisible] = useState(false as boolean)

  return (
    <>
      {props.switchUsed ? (
        <View>
          <View accessible style={styles.container}>
            <View>
              {props.icon}
              {props.vipOption && (
                <Image
                  source={require("~/Images/star.png")}
                  style={styles.vip_star_img}
                />
              )}
            </View>
            <View style={styles.content_wrap}>
              <View>
                <Text style={styles.title}>{props.title}</Text>
                {!props.clearAttributes &&
                !props.switchUsed &&
                props.subtitle ? (
                  <Text style={styles.subtitle}>{props.subtitle}</Text>
                ) : null}
              </View>
              {props.isOffline && (
                <OfflineBadge style={styles.offline_badge} iconSize={14.5} />
              )}
              {!props.clearAttributes && props.switchUsed && (
                <Switch
                  accessibilityStates
                  color="#674ABE"
                  value={props.switchValue}
                  onValueChange={() =>
                    props.isOffline
                      ? props.setOfflinePopupVisible(true)
                      : props.setSwitchValue(!props.switchValue)
                  }
                />
              )}
            </View>
          </View>
        </View>
      ) : (
        <BaseButton
          rippleColor="silver"
          onPress={
            props.isOffline
              ? () => props.setOfflinePopupVisible(true) as any
              : props.popupContent
              ? () => setPopupVisible(true)
              : props.onPress
          }
        >
          <View accessible style={styles.container}>
            <View>
              {props.icon}
              {props.vipOption && (
                <Image
                  source={require("~/Images/star.png")}
                  style={styles.vip_star_img}
                />
              )}
            </View>
            <View style={styles.content_wrap}>
              <View>
                <Text style={styles.title}>{props.title}</Text>
                {!props.clearAttributes &&
                !props.switchUsed &&
                props.subtitle ? (
                  <Text style={styles.subtitle}>{props.subtitle}</Text>
                ) : null}
              </View>
              {props.isOffline && (
                <OfflineBadge style={styles.offline_badge} iconSize={14.5} />
              )}
              {!props.clearAttributes && props.switchUsed && (
                <Switch
                  accessibilityStates
                  style={styles.switch}
                  value={props.switchValue}
                  onValueChange={() =>
                    props.isOffline
                      ? props.setOfflinePopupVisible(true)
                      : props.setSwitchValue(!props.switchValue)
                  }
                />
              )}
            </View>
          </View>
        </BaseButton>
      )}

      {props.popupContent && (
        <PopupContent
          title={props.popupContent?.title}
          fields={props.popupContent?.fields}
          hidePopup={() => setPopupVisible(false)}
          storageName={props.storageName as any}
          setDataFunction={props.setDataFunction}
          getValues={props.getValues}
          popupVisible={popupVisible}
          setPopupVisible={setPopupVisible}
        />
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 19,
    height: 55,
  },

  content_wrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "85%",
    left: 40,
    position: "absolute",
  },

  title: {
    color: "#232323",
    fontWeight: "bold",
  },

  subtitle: {
    color: "#674ABE",
    fontWeight: "bold",
    fontSize: 13.5,
  },

  switch: {
    left: 10,
  },

  vip_star_img: {
    position: "absolute",
    height: 17.65,
    width: 17.65,
    right: -6,
    top: -5,
  },

  offline_badge: {
    right: 0,
  },
})

export default React.memo(DrawerItemComponent, isEqualMemoComparison)
