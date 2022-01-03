import React,{useState} from 'react';
import { Text, View, Picker,StyleSheet, TextInput, Button, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import Constants from 'expo-constants';

export default function Vaccination(){
  const { register, setValue, handleSubmit, control, reset, formState: { errors } } = useForm({
    defaultValues: {
      fullName: '',
      age: '',
      status:''
    }
  });
  const onSubmit = data => {
    console.log(data);
  };

  const onChange = arg => {
    return {
      value: arg.nativeEvent.text,
    };
  };
  
  const [selectedValue, setSelectedValue] = useState("java");
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Full name</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Full Name"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Age</Text>
      <Controller
        control={control}
        render={({field: { onChange, onBlur, value }}) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="Age"
        rules={{ required: true }}
      />
      <Text style={styles.label}>Vaccination Status</Text>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 300,color:'white' }}
        onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Fully Vaccinated" value="java" />
        <Picker.Item label="Partially Vaccinated" value="js" />
        <Picker.Item label="Not Vaccinated" value="js" />
      </Picker>

  <View style={styles.button}>
        <Button
          style={styles.buttonInner}
          color
          title="Submit"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    color: 'white',
    margin: 20,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: 'white',
    height: 40,
    backgroundColor: '#4DAFC0',
    borderRadius: 4,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
    backgroundColor: '#0e101c',
  },
  input: {
    backgroundColor: 'white',
    borderColor: 'black',
    height: 40,
    padding: 10,
    borderRadius: 4,
  },
});