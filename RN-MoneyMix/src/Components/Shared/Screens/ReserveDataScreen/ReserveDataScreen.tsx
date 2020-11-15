// PLUGINS IMPORTS //
import React, { useEffect, useState } from "react"
import { View, Text, BackHandler, StyleSheet } from "react-native"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import Body from "./Body/Body"
import CreateReserveDataPopup from "./CreateReserveDataPopup/CreateReserveDataPopup"

import AlertPopup from "~/Components/Shared/Components/Popups/AlertPopup/AlertPopup"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"
import { handleBackButton } from "~/Components/Shared/Helpers/Functions/GeneralFunctions"

// EXTRA IMPORTS //
import EmptyListSVG from "~/Images/SVG/EmptyListSVG"

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  route: any
  ReservedCopiesList: Array<string>

  getReservedCopiesListThunkCreator: () => void
  createReserveCopyThunkCreator: () => void
  removeReserveCopyThunkCreator: (ID: string) => void
  applyReserveCopyThunkCreator: (ID: string) => void
}

const ReserveDataScreen: React.FC<PropsType> = (props) => {
  const [responsePopupData, setResponsePopupData] = useState({
    visible: false as boolean,
    title: null as string | null,
    body: null as string | null,
  })
  const { t } = useTranslation()

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

  useEffect(() => {
    props.getReservedCopiesListThunkCreator()
  }, [])

  return (
    <>
      {props.ReservedCopiesList && props.ReservedCopiesList.length > 0 ? (
        <Body
          navigation={props.navigation}
          setResponsePopupData={setResponsePopupData}
          ReservedCopiesList={props.ReservedCopiesList}
          applyReserveCopyThunkCreator={props.applyReserveCopyThunkCreator}
          removeReserveCopyThunkCreator={props.removeReserveCopyThunkCreator}
        />
      ) : (
        <View style={styles.empty_container}>
          <EmptyListSVG height={225} width={225} />
          <Text style={styles.empty_text}>
            {t("EmptyLists.EmptyReservedCopies")}
          </Text>
        </View>
      )}

      <CreateReserveDataPopup
        popupVisible={props.route.params.popupVisible}
        setPopupVisible={(popupVisibility: boolean) =>
          props.navigation.setParams({
            popupVisible: popupVisibility,
          })
        }
        function={() => {
          props.navigation.setParams({
            popupVisible: false,
          })
          props.createReserveCopyThunkCreator()
          setResponsePopupData({
            visible: true,
            title: t("ReservedDataScreen.Popup.TitleRequestRecieved"),
            body: t("ReservedDataScreen.Popup.PPRequestCreateReserveData"),
          })
        }}
      />

      <AlertPopup
        popupVisible={responsePopupData.visible}
        setPopupVisible={(popupVisibility: boolean) =>
          setResponsePopupData({
            ...responsePopupData,
            visible: popupVisibility,
          })
        }
        title={responsePopupData.title}
        content={<Text>{responsePopupData.body}</Text>}
        removeCancelBtn
      />
    </>
  )
}

const styles = StyleSheet.create({
  empty_container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginBottom: "30%",
  },

  empty_text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
})

export default React.memo(ReserveDataScreen, isEqualMemoComparison)
