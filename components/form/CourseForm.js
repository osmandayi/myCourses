import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import Input from "./Input";
import CustomButton from "../CustomButton";
import { getFormatted } from "../../helper/date";

export default function CourseForm({
  cancelHandler,
  onSubmit,
  buttonLabel,
  defaultValues,
}) {
  const [inputs, setInputs] = useState({
    amount: {
      value: defaultValues?.amount.toString() ?? "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormatted(defaultValues?.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description ?? "",
      isValid: true,
    },
  });

  const inputChange = (inputIdentifier, enteredValue) => {
    setInputs((currentInput) => {
      return {
        ...currentInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  };

  const addOrUpdateHandler = () => {
    const courseData = {
      amount: Number(inputs.amount.value),
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };
    const amountIsValid = !isNaN(courseData.amount) && courseData.amount > 0;
    const dateIsValid = new Date(courseData.date).toString() !== "Invalid Date";
    const descriptionIsValid = courseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currentInputs) => {
        return {
          amount: { value: currentInputs.amount.value, isValid: amountIsValid },
          date: { value: currentInputs.date.value, isValid: dateIsValid },
          description: {
            value: currentInputs.description.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }

    onSubmit(courseData);
  };

  console.log("INPUTS :", inputs);
  return (
    <View style={styles.form}>
      <Text style={styles.title}>Kurs Bilgileri</Text>
      <View style={styles.priceAndDate}>
        <Input
          invalid={!inputs.amount.isValid}
          style={styles.flexAll}
          label={"Tutar"}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChange.bind(this, "amount"),
            value: inputs.amount.value,
          }}
        />
        <Input
          invalid={!inputs.date.isValid}
          style={styles.flexAll}
          label={"Tarih"}
          textInputConfig={{
            maxLength: 10,
            placeHolder: "YYYY-MM-DD",
            onChangeText: inputChange.bind(this, "date"),
            value: inputs.date.value,
          }}
        />
      </View>
      <Input
        invalid={!inputs.description.isValid}
        label={"Başlık"}
        textInputConfig={{
          multiline: true,
          onChangeText: inputChange.bind(this, "description"),
          value: inputs.description.value,
        }}
      />
      <View style={styles.error}>
        {!inputs.amount.isValid && (
          <Text>Lütfen tutarı doğru formatta giriniz !</Text>
        )}
        {!inputs.date.isValid && (
          <Text>Lütfen tarihi doğru formatta giriniz !</Text>
        )}
        {!inputs.description.isValid && (
          <Text>Lütfen açıklamayı doğru formatta giriniz !</Text>
        )}
      </View>
      <View style={styles.buttons}>
        <CustomButton
          onPress={cancelHandler}
          style={styles.cancel}
          styleText={styles.cancelText}
          label={"İptal Et"}
        />
        <CustomButton
          onPress={addOrUpdateHandler}
          style={styles.addOrUpdate}
          styleText={styles.addOrUpdateText}
          label={buttonLabel}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    color: "darkblue",
    marginVertical: 20,
  },
  priceAndDate: {
    flexDirection: "row",
  },
  flexAll: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  cancel: {
    backgroundColor: "red",
    minWidth: 120,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelText: {
    color: "white",
  },
  addOrUpdate: {
    backgroundColor: "blue",
    minWidth: 120,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  addOrUpdateText: {
    color: "white",
  },
  error: {
    alignItems: "center",
    gap: 3,
    marginBottom: 10,
  },
});
