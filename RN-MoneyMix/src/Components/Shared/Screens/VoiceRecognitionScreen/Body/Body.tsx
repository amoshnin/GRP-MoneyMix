// PLUGINS IMPORTS //
import React, { useEffect } from "react"
import { View, Text, StyleSheet } from "react-native"
import CustomText from "~/Components/Shared/Components/Text/Text"
import * as Animatable from "react-native-animatable"
import Voice from "@react-native-community/voice"
import AsyncStorage from "@react-native-community/async-storage"
import { useTranslation } from "react-i18next"

// COMPONENTS IMPORTS //
import ButtonItem from "../Components/ButtonItem/ButtonItem"
import {
  renderBillName,
  renderCategoryTitle,
  isEqualMemoComparison,
} from "~/Components/Shared/Helpers/Functions/RenderInfoFunctions"

// EXTRA IMPORTS //
import { FontAwesome } from "@expo/vector-icons"

/////////////////////////////////////////////////////////////////////////////

type PropsType = {
  navigation: any

  isRecording: boolean
  setIsRecording: (newIsRecordingStatus: boolean) => void

  categoryTitleExample: string
  billTitleExample: string

  voiceState: any
  setVoiceState: (newVoiceState: any) => void
  recogniseTextThunkCreator: (text: string, t: any) => void
}

const Body: React.FC<PropsType> = (props) => {
  const { t } = useTranslation()

  useEffect(() => {
    Voice.onSpeechRecognized = onSpeechRecognized
    Voice.onSpeechResults = onSpeechResults
    Voice.onSpeechPartialResults = onSpeechPartialResults
    Voice.onSpeechEnd = onSpeechEnd
    Voice.onSpeechError = onSpeechError

    Voice.destroy().then(Voice.removeAllListeners)
  }, [])

  useEffect(() => {
    props.navigation.addListener("focus", () => {
      startRecognizing()
    })
    props.navigation.addListener("blur", () => {
      Voice.destroy().then(Voice.removeAllListeners)
      stopRecognizing()
      props.setVoiceState({
        ...props.voiceState,
        recognized: false,
        results: [],
        partialResults: [],
      })
    })
  }, [props.navigation])

  const onSpeechRecognized = (e: any) => {
    props.setVoiceState({
      ...props.voiceState,
      recognized: true,
    })
  }

  const onSpeechResults = (e: any) => {
    props.recogniseTextThunkCreator(e.value[0], t)
    props.setVoiceState({
      ...props.voiceState,
      results: e.value,
    })
  }

  const onSpeechPartialResults = (e: any) => {
    props.setVoiceState({
      ...props.voiceState,
      partialResults: e.value,
    })
  }

  const onSpeechEnd = (e: any) => {
    props.setIsRecording(false)
  }

  const onSpeechError = (e: any) => {
    props.setIsRecording(false)
  }

  const startRecognizing = async () => {
    const language = await AsyncStorage.getItem("selectedLanguage")

    props.setVoiceState({
      ...props.voiceState,
      recognized: false,
      results: [],
      partialResults: [],
    })
    try {
      const locale =
        language === "English"
          ? "en-US"
          : language === "Russian"
          ? "ru-RU"
          : language === "Spanish"
          ? "es-ES"
          : language === "German"
          ? "de-DE"
          : "en-US"

      await Voice.start(locale)
      props.setIsRecording(true)
    } catch (e) {
      props.setIsRecording(true)
    }
  }

  const stopRecognizing = async () => {
    try {
      await Voice.stop()
      props.setIsRecording(false)
    } catch (e) {
      props.setIsRecording(true)
    }
  }

  const renderContent = () => {
    if (props.voiceState.results[0] || props.voiceState.partialResults[0]) {
      return (
        <View style={styles.text_block}>
          {props.voiceState.results[0] ? (
            <Text style={styles.text_block_text}>
              {props.voiceState.results[0]}
            </Text>
          ) : (
            <Text style={styles.text_block_text}>
              {props.voiceState.partialResults[0]}
            </Text>
          )}
        </View>
      )
    } else {
      return (
        <View style={styles.example_wrap}>
          <CustomText style={styles.example_title}>
            {t("VoiceRecognitionScreen.Speak")}...
          </CustomText>
          <View style={styles.example_block}>
            <Text style={[styles.text_block_text, { color: "black" }]}>
              {t("VoiceRecognitionScreen.Example")}:{" "}
              {t("VoiceRecognitionScreen.PPExample1")} "
              {renderCategoryTitle(props.categoryTitleExample, t, true)}"{" "}
              {t("VoiceRecognitionScreen.PPExample2")} "
              {renderBillName(props.billTitleExample, t)}"{" "}
              {t("GeneralPhrases.or")} 50 "
              {renderCategoryTitle(props.categoryTitleExample, t, true)}" "
              {renderBillName(props.billTitleExample, t)}"
            </Text>
          </View>
        </View>
      )
    }
  }

  return (
    <View style={styles.wrapper}>
      {renderContent()}
      {props.isRecording ? (
        <Animatable.View
          animation={"tada"}
          easing="ease-out"
          iterationCount={"infinite"}
          style={styles.micro_wrap}
        >
          <ButtonItem
            onPress={props.isRecording ? stopRecognizing : startRecognizing}
            backgroundColor={"#674ABE"}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </ButtonItem>
        </Animatable.View>
      ) : (
        <View style={styles.micro_wrap}>
          <ButtonItem
            onPress={props.isRecording ? stopRecognizing : startRecognizing}
            backgroundColor={"#674ABE"}
          >
            <FontAwesome name="microphone" size={24} color="white" />
          </ButtonItem>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 2,
    width: "100%",
    alignItems: "center",
  },

  micro_wrap: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },

  example_wrap: {
    alignItems: "center",
  },

  example_title: {
    fontSize: 26,
    marginBottom: 20,
  },

  example_block: {
    borderWidth: 1,
    borderColor: "#674ABE",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
    width: "80%",
  },

  text_block: {
    marginTop: 60,
    backgroundColor: "#674ABE",
    width: "80%",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 4,
  },

  text_block_text: {
    color: "white",
    textAlign: "center",
    lineHeight: 22,
  },
})

export default React.memo(Body, isEqualMemoComparison)
