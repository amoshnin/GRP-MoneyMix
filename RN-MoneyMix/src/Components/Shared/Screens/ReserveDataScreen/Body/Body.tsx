// PLUGINS IMPORTS //
import React from "react"
import { ScrollView } from "react-native"

// COMPONENTS IMPORTS //
import ReservedCopyItem from "./ReservedCopyItem/ReservedCopyItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

////////////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  ReservedCopiesList: Array<string>

  setResponsePopupData: (newResponsePopupData: {
    visible: boolean
    title: string | null
    body: string | null
  }) => void
  removeReserveCopyThunkCreator: (ID: string) => void
  applyReserveCopyThunkCreator: (ID: string) => void
}

const Body: React.FC<PropsType> = (props) => {
  return (
    <ScrollView>
      {props.ReservedCopiesList.map((reservedCopyID: string, index: number) => {
        return (
          <ReservedCopyItem
            navigation={props.navigation}
            setResponsePopupData={props.setResponsePopupData}
            reservedCopyID={reservedCopyID}
            index={index + 1}
            applyReserveCopyThunkCreator={props.applyReserveCopyThunkCreator}
            removeReserveCopyThunkCreator={props.removeReserveCopyThunkCreator}
          />
        )
      })}
    </ScrollView>
  )
}

export default React.memo(Body, isEqualMemoComparison)
