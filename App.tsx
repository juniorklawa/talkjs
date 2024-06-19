import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ChatScreen from './src/screens/ChatScreen';
import Inbox from './src/screens/Inbox';
import {RootStackParamList} from './src/type';

// TODO - Chat as coaches
// TODO - Group chat (many coaches, one user)
// TODO - Announcements
// TOTDO - Can I customize Inbox items ?

export default function App() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inbox">
        <Stack.Screen name="Inbox" component={Inbox} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
