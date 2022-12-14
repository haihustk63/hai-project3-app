// import từ các thư viện và module ngoài
import { useContext, useEffect, useState } from "react";
import { Divider } from "@rneui/themed";
import { LinearGradient } from "expo-linear-gradient";
import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppButton from "src/components/AppButton";
import AppSlider from "src/components/AppSlider";
import { MIN_MAX_SLIDER } from "src/constant";
import { DeviceContext } from "src/context/DeviceContext";
import { useUpdateMoistureConfig, useUpdateWaterPump } from "./hooks";

const { MIN, MAX } = MIN_MAX_SLIDER;

const Garden = () => {
  /*
Các state ở đây
minPercent: Giá trị hiện tại của thanh Min-Slider
maxPercent: Giá trị hiện tại của thanh Max-Slider
refreshing: Báo hiệu cần lấy lại data mới (kéo từ trên xuống để reload màn)
moistureDevice: Thông tin của cảm biến độ ẩm
waterPumpDevice: Thông tin của máy bơm nước
  */
  const [minPercent, setMinPercent] = useState(30);
  const [maxPercent, setMaxPercent] = useState(100);
  const [refreshing, setRefreshing] = useState(false);
  const [moistureDevice, setMoistureDevice] = useState();
  const [waterPumpDevice, setWaterPumpDevice] = useState();

  // Lấy ra các giá trị từ DeviceContext
  const { devices, getAllDevices } = useContext(DeviceContext) as any;

  useEffect(() => {
    if (devices?.length) {
      // Nếu danh sách thiết bị đã có, tìm ra thông tin của cảm biến độ ẩm và máy bơm
      // và lưu và các state
      const findMoistureDevice = devices?.find((d: any) =>
        d.type?.includes("moisture")
      );

      const findWaterPumpDevice = devices?.find((d: any) =>
        d.type.includes("pump")
      );

      setMoistureDevice(findMoistureDevice);
      setWaterPumpDevice(findWaterPumpDevice);
      
      // Lấy thông tin minThreshold, desireThreshold hiện tại và set cho minPercent, maxPercent
      const {
        config: { minThreshold, desireThreshold },
      } = findMoistureDevice || {};
      
      setMinPercent(minThreshold);
      setMaxPercent(desireThreshold);
    }
  }, [devices]);

  // Sử dụng các hàm từ các custom hooks
  const { onUpdateMoistureConfig } = useUpdateMoistureConfig();
  const { onUpdateWaterPump } = useUpdateWaterPump();

  // Hàm được gọi khi thay đổi giá trị của thanh Min-Slider
  const handleOnChangeMinValue = (value: number) => {
    setMinPercent(value);
  };

  // Hàm được gọi khi thay đổi giá trị của thanh Max-Slider
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
      <View style={{ ...styles.info, ...styles.shadow }}>
        <Text style={styles.infoTitle}>SOIL MOISTURE</Text>
        <Divider />
        <Text style={styles.infoValue}>
          {(moistureDevice as any)?.value || 0}
        </Text>
      </View>

      {/* Dựa vào giá trị của máy bơm để biết hệ thống có đang tưới nước không */}
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

      <View style={{ ...styles.option, ...styles.shadow }}>
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

// Custom style cho Garden
const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 10,
  },

  shadow: {
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
  },
  textSlider: {},
  textSliderPercent: {
    fontWeight: "700",
    color: "#EF629F",
  },
  stopStartButton: {
    marginTop: 10,
  },
});
