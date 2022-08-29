import { Divider } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import { useContext, useEffect, useState } from "react";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AppButton from "src/components/AppButton";
import AppSlider from "src/components/AppSlider";
import { MIN_MAX_MOISTURE } from "src/constant";
import { DeviceContext } from "src/context/DeviceContect";
import { useUpdateMoistureConfig, useUpdateWaterPump } from "./hooks";

const { MIN, MAX } = MIN_MAX_MOISTURE;

const Garden = () => {
  const [minPercent, setMinPercent] = useState(30);
  const [maxPercent, setMaxPercent] = useState(100);
  const [refreshing, setRefreshing] = useState(false);
  const [moistureDevice, setMoistureDevice] = useState();
  const [waterPumpDevice, setWaterPumpDevice] = useState();

  const { devices, getAllDevices } = useContext(DeviceContext);

  useEffect(() => {
    if (devices?.length) {
      const findMoistureDevice = devices?.find((d: any) =>
        d.type?.includes("moisture")
      );

      const findWaterPumpDevice = devices?.find((d: any) =>
        d.type.includes("pump")
      );

      setMoistureDevice(findMoistureDevice);
      setWaterPumpDevice(findWaterPumpDevice);

      const {
        config: { minThreshold, desireThreshold },
      } = findMoistureDevice || {};

      setMinPercent(minThreshold);
      setMaxPercent(desireThreshold);
    }
  }, [devices]);

  const { onUpdateMoistureConfig } = useUpdateMoistureConfig();
  const { onUpdateWaterPump } = useUpdateWaterPump();

  const handleOnChangeMinValue = (value: number) => {
    setMinPercent(value);
  };

  const handleOnChangeMaxValue = (value: number) => {
    setMaxPercent(value);
  };

  const handleOnRefresh = async () => {
    setRefreshing(true);
    await new Promise((res, rej) => {
      setTimeout(res, 1000);
    });
    await getAllDevices();
    setRefreshing(false);
  };

  const handleUpdateConfig = async () => {
    const deviceId = (moistureDevice as any)?._id;
    await onUpdateMoistureConfig(deviceId, {
      minThreshold: minPercent,
      desireThreshold: maxPercent,
    });
  };

  const handleToggleWaterPump = async () => {
    if (waterPumpDevice) {
      await onUpdateWaterPump((waterPumpDevice as any)._id);
      await getAllDevices();
    }
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleOnRefresh} />
      }
    >
      <View style={styles.info}>
        <Text style={styles.infoTitle}>SOIL MOISTURE</Text>
        <Divider />
        <Text style={styles.infoValue}>
          {(moistureDevice as any)?.value || 0}
        </Text>
      </View>

      {waterPumpDevice ? (
        (waterPumpDevice as any).value ? (
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
        )
      ) : (
        <></>
      )}

      <View style={styles.option}>
        <Text style={styles.optionTitle}>CONFIG</Text>
        <Text style={styles.optionInstruction}>You choose min, max %</Text>
        <View style={styles.sliderContainer}>
          <Text style={styles.textSlider}>
            Min threshold:{" "}
            <Text style={styles.textSliderPercent}>{minPercent}%</Text>
          </Text>
          <AppSlider
            value={minPercent}
            minimum={MIN}
            maximum={MAX}
            onValueChange={handleOnChangeMinValue}
            step={1}
          />
        </View>
        <View style={styles.sliderContainer}>
          <Text style={styles.textSlider}>
            Desire threshold:{" "}
            <Text style={styles.textSliderPercent}>{maxPercent}%</Text>
          </Text>
          <AppSlider
            value={maxPercent}
            minimum={MIN}
            maximum={MAX}
            onValueChange={handleOnChangeMaxValue}
            step={1}
          />
        </View>

        <AppButton
          title="Update Config"
          onPress={handleUpdateConfig}
          type="outline"
        />
      </View>

      {waterPumpDevice ? (
        (waterPumpDevice as any).value ? (
          <AppButton
            title="Stop Watering"
            onPress={handleToggleWaterPump}
            buttonStyle={styles.stopStartButton}
            color="secondary"
          />
        ) : (
          <AppButton
            title="Start Watering"
            onPress={handleToggleWaterPump}
            buttonStyle={styles.stopStartButton}
            color="secondary"
          />
        )
      ) : (
        <></>
      )}
    </ScrollView>
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
