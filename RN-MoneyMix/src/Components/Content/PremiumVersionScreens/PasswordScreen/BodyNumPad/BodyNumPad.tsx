// PLUGINS IMPORTS //
import React from "react"
import { View, Text, StyleSheet } from "react-native"

// COMPONENTS IMPORTS //
import NumPadItem from "./NumPadItem/NumPadItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  secretCode: string
  setSecretCode: (secretCode: string) => void
}

const BodyNumPad: React.FC<PropsType> = (props) => {
  const concatSecretCide = (number: string) => {
    props.setSecretCode(props.secretCode.concat(number))
  }

  const clearSecretCode = () => {
    props.setSecretCode(props.secretCode.slice(0, -1))
  }

  return (
    <View style={styles.container}>
      <View style={styles.line_wrap}>
        <NumPadItem
          number={<Text style={styles.number}>1</Text>}
          onPress={() => concatSecretCide("1")}
        />
        <NumPadItem
          number={<Text style={styles.number}>2</Text>}
          onPress={() => concatSecretCide("2")}
        />
        <NumPadItem
          number={<Text style={styles.number}>3</Text>}
          onPress={() => concatSecretCide("3")}
        />
      </View>
      <View style={styles.line_wrap}>
        <NumPadItem
          number={<Text style={styles.number}>4</Text>}
          onPress={() => concatSecretCide("4")}
        />
        <NumPadItem
          number={<Text style={styles.number}>5</Text>}
          onPress={() => concatSecretCide("5")}
        />
        <NumPadItem
          number={<Text style={styles.number}>6</Text>}
          onPress={() => concatSecretCide("6")}
        />
      </View>
      <View style={styles.line_wrap}>
        <NumPadItem
          number={<Text style={styles.number}>7</Text>}
          onPress={() => concatSecretCide("7")}
        />
        <NumPadItem
          number={<Text style={styles.number}>8</Text>}
          onPress={() => concatSecretCide("8")}
        />
        <NumPadItem
          number={<Text style={styles.number}>9</Text>}
          onPress={() => concatSecretCide("9")}
        />
      </View>
      <View style={styles.line_wrap}>
        <NumPadItem />
        <NumPadItem
          number={<Text style={styles.number}>0</Text>}
          onPress={() => concatSecretCide("0")}
        />
        <NumPadItem
          onPress={() => clearSecretCode()}
          number={<Feather name="delete" size={24} color="#674ABE" />}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  line_wrap: {
    flexDirection: "row",
    flex: 1,
  },

  number: {
    color: "#674ABE",
    fontSize: 30,
  },
})

export default React.memo(BodyNumPad, isEqualMemoComparison)
