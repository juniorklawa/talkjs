export type RootStackParamList = {
  ChatScreen: {participant?: any; conversationId?: string};
  Inbox: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
