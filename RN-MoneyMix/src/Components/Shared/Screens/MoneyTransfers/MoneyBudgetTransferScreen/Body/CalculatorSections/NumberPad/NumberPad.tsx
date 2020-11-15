// PLUGINS IMPORTS //
import React from "react"
import { View, StyleSheet } from "react-native"
import Text from "~/Components/Shared/Components/Text/Text"

// COMPONENTS IMPORTS //
import BlockItem from "~/Components/Shared/Screens/MoneyTransfers/Shared/Components/BlockItem/BlockItem"
import { isEqualMemoComparison } from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { Feather } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any
  newBudgetAmount: string
  setNewBudgetAmount: (newBudgetAmount: string) => void
  sendNewMoney: () => void
}

const NumberPad: React.FC<PropsType> = (props) => {
  const concatToAmount = (number: string) => {
    props.setNewBudgetAmount(props.newBudgetAmount.concat(number))
  }

  const removeLastChar = () => {
    const newStr = props.newBudgetAmount.slice(0, -1)
    props.setNewBudgetAmount(newStr)
  }

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <BlockItem
          icon={<Text style={styles.number}>1</Text>}
          onPress={() => concatToAmount("1")}
        />
        <BlockItem
          icon={<Text style={styles.number}>2</Text>}
          onPress={() => concatToAmount("2")}
        />
        <BlockItem
          icon={<Text style={styles.number}>3</Text>}
          onPress={() => concatToAmount("3")}
        />
        <BlockItem
          icon={<Feather name="delete" size={24} color="#674ABE" />}
          onPress={removeLastChar}
          isGray
        />
      </View>

      <View style={styles.container}>
        <BlockItem
          icon={<Text style={styles.number}>4</Text>}
          onPress={() => concatToAmount("4")}
        />
        <BlockItem
          icon={<Text style={styles.number}>5</Text>}
          onPress={() => concatToAmount("5")}
        />
        <BlockItem
          icon={<Text style={styles.number}>6</Text>}
          onPress={() => concatToAmount("6")}
        />
        <BlockItem
          icon={<Feather name="check" size={35} color="white" />}
          onPress={() => props.sendNewMoney()}
          containerStyle={{
            height: 216,
            backgroundColor: "#674ABE",
          }}
        />
      </View>

      <View style={[styles.container, { marginTop: -144, marginRight: 90 }]}>
        <BlockItem
          icon={<Text style={styles.number}>7</Text>}
          onPress={() => concatToAmount("7")}
        />
        <BlockItem
          icon={<Text style={styles.number}>8</Text>}
          onPress={() => concatToAmount("8")}
        />
        <BlockItem
          icon={<Text style={styles.number}>9</Text>}
          onPress={() => concatToAmount("9")}
        />
      </View>

      <View style={[styles.container, { marginRight: 90 }]}>
        <BlockItem
          icon={<Text style={styles.number}>.</Text>}
          onPress={() =>
            props.newBudgetAmount.length > 0 && concatToAmount(".")
          }
        />
        <BlockItem
          icon={<Text style={styles.number}>0</Text>}
          onPress={() => concatToAmount("0")}
        />
        <BlockItem removeRipple />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
  },

  container: {
    flexDirection: "row",
  },

  number: {
    color: "#674ABE",
    fontSize: 30,
  },
})

export default React.memo(NumberPad, isEqualMemoComparison)
