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
import { DeviceContext } from "src/context/DeviceContect";
import { addNewDeviceSchema, ADD_NEW_DEVICE_FIELD } from "../../schemas";
import GroupField from "./GroupField";

const { NAME, TYPE, PORT, PERSON, FLOOR, ROOM } = ADD_NEW_DEVICE_FIELD;

const initialValues = {
  [NAME]: "",
  [TYPE]: "",
  [PORT]: "",
  [PERSON]: "",
  [FLOOR]: "",
  [ROOM]: "",
};

const AddNewDevice = () => {
  const {
    addNewDevice,
    deviceTypes = [],
    devices,
    getAllDevices,
  } = useContext(DeviceContext) as any;
  const navigate = useNavigation();
  const ref = useRef(null) as any;

  const handleSubmitForm = async (values: any) => {
    if (deviceTypes.length) {
      const { type } = values;
      const t = deviceTypes?.find((t: any) => t?.value === type) as any;

      if (t) {
        const data = { ...values, interact: t.interact };
        await addNewDevice(data);
        ref?.current.setValues({ ...initialValues });
        ref?.current.setTouched({ [NAME]: false, [TYPE]: false });
        await getAllDevices();
        // navigate.navigate(SCREEN_NAME.HOME as any);
      }
    }
  };

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

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
  },
  image: {
    width: "100%",
    aspectRatio: 1,
    // height:
  },
});
