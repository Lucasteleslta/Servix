import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/SplashScreen';
import { Onboarding1Screen } from '../screens/onboarding/Onboarding1Screen';
import { Onboarding2Screen } from '../screens/onboarding/Onboarding2Screen';
import { Onboarding3Screen } from '../screens/onboarding/Onboarding3Screen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ChooseRoleScreen } from '../screens/auth/ChooseRoleScreen';
import { TermsScreen } from '../screens/auth/TermsScreen';
import { PermissionsScreen } from '../screens/auth/PermissionsScreen';
import { RegisterStep1Screen } from '../screens/provider/RegisterStep1Screen';
import { RegisterStep2Screen } from '../screens/provider/RegisterStep2Screen';
import { RegisterStep3Screen } from '../screens/provider/RegisterStep3Screen';
import { RegisterStep4Screen } from '../screens/provider/RegisterStep4Screen';

export type AuthStackParamList = {
  Splash: undefined;
  Onboarding1: undefined;
  Onboarding2: undefined;
  Onboarding3: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ChooseRole: undefined;
  Terms: { isProvider: boolean };
  Permissions: { isProvider: boolean };
  ProviderRegister1: undefined;
  ProviderRegister2: undefined;
  ProviderRegister3: undefined;
  ProviderRegister4: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding1" component={Onboarding1Screen} />
      <Stack.Screen name="Onboarding2" component={Onboarding2Screen} />
      <Stack.Screen name="Onboarding3" component={Onboarding3Screen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      <Stack.Screen name="ChooseRole" component={ChooseRoleScreen} />
      <Stack.Screen name="Terms" component={TermsScreen} />
      <Stack.Screen name="Permissions" component={PermissionsScreen} />
      <Stack.Screen name="ProviderRegister1" component={RegisterStep1Screen} />
      <Stack.Screen name="ProviderRegister2" component={RegisterStep2Screen} />
      <Stack.Screen name="ProviderRegister3" component={RegisterStep3Screen} />
      <Stack.Screen name="ProviderRegister4" component={RegisterStep4Screen} />
    </Stack.Navigator>
  );
}
