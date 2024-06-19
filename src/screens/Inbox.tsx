/* eslint-disable react-native/no-inline-styles */
import {useNavigation} from '@react-navigation/native';
import * as Talkjs from '@talkjs/react-native';
import React, {useEffect} from 'react';
import {View} from 'react-native';
import {APP_ID, me} from '../data';

const Inbox = () => {
  useEffect(() => {
    // checkIfConversationExists();
  }, []);

  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session appId={APP_ID} me={me} enablePushNotifications={true}>
        <View style={{marginTop: 16}}>
          <Talkjs.ConversationList
            onSelectConversation={conversation => {
              navigation.navigate('ChatScreen', {
                conversationId: conversation.conversation.id,
              });
            }}
          />
        </View>
      </Talkjs.Session>
    </View>
  );
};

export default Inbox;
