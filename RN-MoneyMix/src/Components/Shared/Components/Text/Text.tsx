// PLUGINS IMPORTS //
import React from "react"
import ReactNative from "react-native"

// COMPONENTS IMPORTS //
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  size?: number | undefined
  weight?: string | undefined
  color?: string | undefined
  style?: any | undefined
  children: any
}

const Text: React.FC<PropsType> = (props: any) => {
  const getProps = () => {
    const { size, weight, color } = props

    return {
      fontSize: size,
      fontFamily: weight,
      color: color,
    }
  }

  return (
    <ReactNative.Text style={{ ...getProps(), ...props.style }}>
      {props.children}
    </ReactNative.Text>
  )
}

Text.defaultProps = {
  size: 14,
  color: "#1A1824",
  weight: "light",
}

export default React.memo(Text, isEqualMemoComparison)
