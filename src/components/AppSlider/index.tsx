// Import Slider, StyleSheet 
import { Slider } from "@rneui/base";
import { StyleSheet } from "react-native";

/*
AppSlider nhận các props'
value: Giá trị hiện tại
minimum: Giá trị nhỏ nhất của slider
maximum: Giá trị lớn nhất của slider
step: Bước nhảy
onValueChange: Hàm gọi mỗi khi giá trị của slider thay đổi
*/
const AppSlider = ({
  value = 0,
  onValueChange,
  minimum,
  maximum,
  step,
}: {
  value: number;
  onValueChange?: any;
  minimum?: number;
  maximum?: number;
  step?: number;
}) => {
  return (
    // Truyền props cho Slider
    <Slider
      value={value}
      maximumValue={maximum}
      minimumValue={minimum}
      onValueChange={onValueChange}
      step={step}
      thumbStyle={styles.thumb}
      trackStyle={styles.track}
    />
  );
};

// Export AppSlider để sử dụng ở nơi khác
export default AppSlider;

// StyleSheet Object: Custom style cho AppSlider
const styles = StyleSheet.create({
  thumb: {
    backgroundColor: "#EF629F",
    height: 24,
    width: 24,
  },

  track: {
    backgroundColor: "transparent",
  },
});
