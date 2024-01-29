import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useState } from 'react';
import Colors from '../../constants/Colors';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import apiRoutes from '../../util/APIRoutes';
import axios from 'axios';
import useStore from '../../store/studentStore';

const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSecureTextEntry, setIsSecureTextEntry] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isFetching, setIsFecthing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    'Old and New password does not match!',
  );

  const { _token } = useStore();

  const toggleShowPassword = () => {
    setIsSecureTextEntry(!isSecureTextEntry);
  };

  const changePassword = async () => {
    if (password.length > 3) {
      if (!isFetching) {
        setIsFecthing(true);
        await axios
          .post(
            apiRoutes.updatePassword,
            { password, password_confirmation: confirmPassword },
            {
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${_token}`,
              },
            },
          )
          .then((response) => {
            if (response.status === 200) {
              setIsSuccess(true);
              setIsError(false);
              setIsFecthing(false);
            }
          })
          .catch((error) => {
            console.log(error.response);

            setIsSuccess(false);
            setIsError(true);
            setErrorMsg(error.response.data?.errors?.password[0]);
            setIsFecthing(false);
          });
      }
    } else {
      setIsError(true);
      setErrorMsg('Password must be at least 4 characters!');
    }
  };

  return (
    <View style={styles.container}>
      {isError && (
        <View style={styles.error}>
          <Ionicons name="warning" size={24} color={'#fff'} />
          <Text style={{ fontSize: 18, fontFamily: 'mon-sb', color: '#fff' }}>
            {errorMsg}
          </Text>
        </View>
      )}

      {isSuccess && (
        <View style={styles.success}>
          <Ionicons name="checkmark-circle-sharp" size={24} color={'#fff'} />
          <Text style={{ fontSize: 18, fontFamily: 'mon-sb', color: '#fff' }}>
            Password successfully changed!
          </Text>
        </View>
      )}

      <View style={styles.card}>
        <View>
          <Text style={styles.inputLabel}>Old Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={!isSecureTextEntry}
              value={password}
              onChangeText={setPassword}
              autoCapitalize="none"
              style={styles.inputWithIcon}
              placeholder="Old Password"
              placeholderTextColor="#aaa"
            />
            <MaterialCommunityIcons
              name={isSecureTextEntry ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <View>
          <Text style={styles.inputLabel}>New Password</Text>
          <View style={styles.inputContainer}>
            <TextInput
              secureTextEntry={!isSecureTextEntry}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              autoCapitalize="none"
              style={styles.inputWithIcon}
              placeholder="New Password"
              placeholderTextColor="#aaa"
            />
            <MaterialCommunityIcons
              name={isSecureTextEntry ? 'eye-off' : 'eye'}
              size={24}
              color="#aaa"
              onPress={toggleShowPassword}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={changePassword}
          disabled={isFetching}
        >
          {isFetching ? (
            <ActivityIndicator size="small" />
          ) : (
            <Text style={styles.buttonText}>Change Password</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 20,
    borderRadius: 10,
    padding: 20,
    rowGap: 10,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'mon-sb',
    marginBottom: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f3f3f3',
    borderRadius: 8,
    paddingHorizontal: 14,
  },
  inputWithIcon: {
    flex: 1,
    color: '#333',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
    fontFamily: 'mon-sb',
  },
  submitButton: {
    width: '100%',
    backgroundColor: Colors.primary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    color: '#fff',
    alignSelf: 'center',
    marginTop: 15,
  },
  buttonText: {
    fontFamily: 'mon-b',
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
  },
  error: {
    backgroundColor: Colors.danger,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  success: {
    backgroundColor: Colors.success,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ChangePassword;
