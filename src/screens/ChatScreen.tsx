/* eslint-disable react-native/no-inline-styles */
import {RouteProp, useRoute} from '@react-navigation/native';
import * as TalkRn from '@talkjs/react-native';
import * as Talkjs from '@talkjs/react-native';
import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {APP_ID, me} from '../data';
import {RootStackParamList} from '../type';

type ChatScreenProps = RouteProp<RootStackParamList, 'ChatScreen'>;

const ChatScreen = () => {
  const route = useRoute<ChatScreenProps>();
  const chatboxRef = React.useRef<Talkjs.ChatboxRef>(null);

  const {conversationId} = route?.params;

  const conversationBuilder = TalkRn.getConversationBuilder(
    String(conversationId),
  );

  return (
    <View style={{flex: 1}}>
      <Talkjs.Session appId={APP_ID} me={me}>
        <Talkjs.Chatbox
          ref={chatboxRef}
          conversationBuilder={conversationBuilder}
          loadingComponent={
            <ActivityIndicator
              size="large"
              style={{
                flex: 1,
                alignSelf: 'center',
                justifyContent: 'center',
                width: '100%',
                height: '100%',
              }}
            />
          }
        />
      </Talkjs.Session>
    </View>
  );
};

export default ChatScreen;
