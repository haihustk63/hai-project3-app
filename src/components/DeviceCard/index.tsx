// Import từ thư viện cần thiết 
import { StyleSheet, Text, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";

// Import AppButton
import AppButton from "../AppButton";

/* DeviceCard nhận vào các props 
title: Tên thiết bị
value: Giá trị của thiết bị đó (như là ON/OFF)
hasButton: Có nút bấm không
buttonColor: Màu của nút bấm
typeButton: Kiểu button (outline, clear, solid)
onPress: Hàm thực hiện khi bấm nút
style: Style custom
info: Thông tin của người sở hữu thiết bị (Ở đây là email)
*/
const DeviceCard = ({
  title,
  value,
  buttonColor,
  hasButton,
  onPress,
  typeButton,
  style,
  info,
}: {
  title: string;
  value: number | string;
  buttonColor?: any;
  hasButton?: boolean;
  onPress?: any;
  typeButton?: any;
  style?: any;
  info?: string;
}) => {
  return (
    <View style={{ ...styles.container, ...style }}>
      {/* Sử dụng LinearGradient để tạo background màu gradient cho card */}
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#EECDA3", "#EF629F"]}
        style={styles.linearContainer}
      >
        <View style={styles.subContainer}>
          <View style={styles.leftContainer}>
            <Icon name="lightbulb-o" size={28} color="#fff" />
            <Text style={styles.leftText}>{title}</Text>
          </View>
          {/* Nếu hasButton là true thì mới hiển thị button và truyền vào các props */}
          {hasButton ? (
            <AppButton
              title={String(value)}
              onPress={onPress}
              color={buttonColor}
              type={typeButton}
              buttonStyle={styles.button}
              titleStyle={styles.buttonTitle}
            />
          ) : (
            <Text style={styles.rightText}>{value}</Text>
          )}
        </View>
        {/* Nếu có info thì hiển thị bằng thẻ Text */}
        {!!info && <Text style={styles.linearContainer.infoText}>{info}</Text>}
      </LinearGradient>
    </View>
  );
};

// Export DeviceCard để sử dụng ở nơi khác
export default DeviceCard;

// Style custom cho component
const styles = StyleSheet.create({
  container: {
    flexBasis: "100%",
    paddingVertical: 5,
    shadowOffset: { width: 2, height: 4 },
    shadowColor: "#171717",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  linearContainer: {
    borderRadius: 5,
    padding: 5,
    infoText: {
      color: "white",
    },
  },
  subContainer: {
    padding: 5,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: 10,
    fontSize: 20,
  },
  leftContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  leftText: {
    fontSize: 16,
    textAlign: "center",
    marginLeft: 10,
    color: "#fff",
  },
  rightText: {
    fontSize: 22,
    textAlign: "center",
    color: "#fff",
  },
  button: {
    padding: 3,
    width: 80,
    backgroundColor: "#fff",
  },
  buttonTitle: {
    color: "#000",
    fontSize: 16,
    fontWeight: "500",
  },
});
