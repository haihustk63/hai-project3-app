// import các thư viện và module ngoài
import { useContext, useMemo, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { Image } from "@rneui/themed";
import { Formik } from "formik";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";

import AppButton from "src/components/AppButton";
import { DeviceContext } from "src/context/DeviceContext";
import { addNewDeviceSchema, ADD_NEW_DEVICE_FIELD } from "../../schemas";
import GroupField from "./GroupField";

// Form sẽ gồm các trường name, type, port, person, floor, room
const { NAME, TYPE, PORT, PERSON, FLOOR, ROOM } = ADD_NEW_DEVICE_FIELD;

// Khởi tạo giá trị cho form
const initialValues = {
  [NAME]: "",
  [TYPE]: "",
  [PORT]: "",
  [PERSON]: "",
  [FLOOR]: "",
  [ROOM]: "",
};

const AddNewDevice = () => {
  // Lấy ra các giá trị mà DeviceContext cung cấp
  const {
    addNewDevice,
    deviceTypes = [],
    devices,
    getAllDevices,
  } = useContext(DeviceContext) as any;

  // reference truyền cho form
  const ref = useRef(null) as any;

  // Hàm thực hiện khi submit form
  const handleSubmitForm = async (values: any) => {
    if (deviceTypes.length) {
      const { type } = values;
      const t = deviceTypes?.find((t: any) => t?.value === type) as any;

      if (t) {
        const data = { ...values, interact: t.interact };
        await addNewDevice(data);
        // Sau khi thêm mới thiết bị, đưa form về trạng thái ban đầu và lấy lại danh sách thiết bị
        ref?.current.setValues({ ...initialValues });
        ref?.current.setTouched({ [NAME]: false, [TYPE]: false });
        await getAllDevices();
      }
    }
  };

  // Schema truyền cho form, sẽ thay đổi khi danh sách ports của các thiết bị thay đổi
  const schema = useMemo(() => {
    const ports = devices?.map((d: any) => d.port);
    return addNewDeviceSchema(ports);
  }, [devices]);

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === "ios" ? 100 : -500}
        enabled
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmitForm}
          validationSchema={schema}
          innerRef={ref}
        >
          {({ values, handleSubmit }) => (
            <View style={styles.container}>
              <Image
                source={{
                  uri: "https://res.cloudinary.com/druoyiv0j/image/upload/v1660299820/dev/smart-home_r3xulg-Sharpened_lehefr.png",
                }}
                style={styles.image}
                PlaceholderContent={<ActivityIndicator />}
              />
              <GroupField />
              <AppButton title="OK" onPress={handleSubmit} />
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AddNewDevice;

// Custom style cho màn AddNewDevice
const styles = StyleSheet.create({
  container: {
  },
  image: {
    width: "100%",
    aspectRatio: 1,
  },
});
