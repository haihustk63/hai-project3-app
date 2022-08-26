import { Slider } from "@rneui/base";
import { StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

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
    <Slider
      value={value}
      maximumValue={maximum}
      minimumValue={minimum}
      onValueChange={onValueChange}
      step={step}
      thumbStyle={styles.thumb}
      trackStyle={styles.track}
    //   thumbProps={{
    //     children: <Icon name="heart" size={35} color="#EF629F" />,
    //   }}
    />
  );
};

export default AppSlider;

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
