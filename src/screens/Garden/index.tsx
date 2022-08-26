import { Divider } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppButton from "src/components/AppButton";
import AppSlider from "src/components/AppSlider";

const Garden = () => {
  const [isWatering, setIsWatering] = useState(true);
  const [minPercent, setMinPercent] = useState(30);
  const [maxPercent, setMaxPercent] = useState(50);

  const handleOnChangeMinValue = (value: number) => {
    setMinPercent(value);
  };

  const handleOnChangeMaxValue = (value: number) => {
    setMaxPercent(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text style={styles.infoTitle}>SOIL MOISTURE</Text>
        <Divider />
        <Text style={styles.infoValue}>33%</Text>
      </View>

      {isWatering ? (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#EECDA3", "#EF629F"]}
          style={styles.textIsWatering}
        >
          <Text style={styles.textIsWateringInner}>
            The system is watering automatically
          </Text>
        </LinearGradient>
      ) : (
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={["#EECDA3", "#EF629F"]}
          style={styles.textIsWatering}
        >
          <Text style={styles.textIsWateringInner}>
            The soil moisture is good!
          </Text>
        </LinearGradient>
      )}

      <View style={styles.option}>
        <Text style={styles.optionTitle}>CONFIG</Text>
        <Text style={styles.optionInstruction}>You choose min, max %</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.textSlider}>
            Min percent:{" "}
            <Text style={styles.textSliderPercent}>{minPercent}%</Text>
          </Text>
          <AppSlider
            value={minPercent}
            minimum={0}
            maximum={50}
            onValueChange={handleOnChangeMinValue}
            step={1}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.textSlider}>
            Max percent:{" "}
            <Text style={styles.textSliderPercent}>{maxPercent}%</Text>
          </Text>
          <AppSlider
            value={maxPercent}
            minimum={0}
            maximum={50}
            onValueChange={handleOnChangeMaxValue}
            step={1}
          />
        </View>

        <AppButton title="Update Config" onPress={null} type="outline" />
      </View>

      {isWatering ? (
        <AppButton
          title="Stop Watering"
          onPress={null}
          buttonStyle={styles.stopStartButton}
          color="secondary"
        />
      ) : (
        <AppButton
          title="Start Watering"
          onPress={null}
          buttonStyle={styles.stopStartButton}
          color="secondary"
        />
      )}
    </View>
  );
};

export default Garden;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },

  info: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginVertical: 10,
  },

  infoTitle: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 10,
  },
  infoValue: {
    fontSize: 40,
    fontWeight: "500",
    textAlign: "center",
    marginTop: 10,
  },
  textIsWatering: {
    padding: 10,
    borderRadius: 5,
    color: "#ffffff",
  },

  textIsWateringInner: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 14,
  },

  option: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 14,
    paddingVertical: 20,
    borderRadius: 5,
    backgroundColor: "#fff",
    marginVertical: 10,
  },

  optionTitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },

  optionInstruction: {
    fontWeight: "500",
    marginBottom: 10,
  },
  sliderContainer: {
    display: "flex",
    marginVertical: 10,
    // flexDirection: "row",
    // alignItems: "center",
    // justifyContent: "space-between",
  },
  textSlider: {},
  textSliderPercent: {
    fontWeight: "700",
    color: "#EF629F",
  },
  slider: {
    // flexGrow: 1,
  },
  stopStartButton: {
    marginTop: 10,
  },
});
