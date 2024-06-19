import * as Talkjs from '@talkjs/react-native';
import axios from 'axios';
import uuid from 'react-native-uuid';
import * as TalkRn from '@talkjs/react-native';

export const me: Talkjs.User = {
  id: 'everaldo-id',
  name: 'Everaldo',
  email: 'everaldo@example.com',
  photoUrl: 'https://avatars.githubusercontent.com/u/7197169?v=4',
  role: 'default',
};

export const coachA: Talkjs.User = {
  id: 'neymar',
  name: 'Neymar',
  photoUrl:
    'https://www.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/09/GettyImages-1668971338-e1694439970587.jpg?w=1220&h=674&crop=1',
  role: 'default',
  welcomeMessage: 'Welcome to the chat!',
};

export const coachB: Talkjs.User = {
  id: 'ronaldo',
  name: 'Ronaldo',
  photoUrl:
    'https://tmssl.akamaized.net/images/foto/galerie/ronaldo-luis-nazario-de-lima-1472042256-5977.jpg?lm=1483606131',
  role: 'default',
  welcomeMessage: 'Welcome to the chat!',
};

export const coachC: Talkjs.User = {
  id: 'messi',
  name: 'Messi',
  photoUrl:
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLhcxC5lGHR7Tf8ipXYnXbKwlD8Jjcfr1GSw&s',
  role: 'default',
  welcomeMessage: 'Welcome to the chat!',
};

export const coaches = [coachA, coachB, coachC];

const getAllCoaches = async () => {
  return coaches;
};

const createUser = async (user: any) => {
  await axios.put(
    `https://api.talkjs.com/v1/${APP_ID}/users/${user.id}`,
    {
      name: user.name,
      email: user.email,
      id: user.id,
      photoUrl: user.photoUrl,
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );
};

export const checkIfConversationExists = async () => {
  const {
    data: {data},
  } = await axios.get(
    `https://api.talkjs.com/v1/${APP_ID}/users/${me.id}/conversations`,
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  const allCoaches = await getAllCoaches();

  await Promise.all(allCoaches.map(coach => createUser(coach)));

  const notInitiatedConversations = allCoaches.filter(
    coach =>
      !data.some(
        (conversation: any) => conversation.otherParticipantId === coach.id,
      ),
  );

  await Promise.all(
    notInitiatedConversations.map(coach => createConversations(coach)),
  );

  await createGroup();
};

const createConversations = async (coach: any) => {
  const conversationId = TalkRn.oneOnOneId(coach, me);

  console.log(`Conversation - ${coach.name} - ${conversationId}`);

  await axios.put(
    `https://api.talkjs.com/v1/${APP_ID}/conversations/${conversationId}`,
    {
      participants: [me.id, coach.id],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  try {
    await axios.post(
      `https://api.talkjs.com/v1/${APP_ID}/conversations/${conversationId}/messages`,
      [
        {
          text: `Hey, my name is ${coach.name} and I am your coach`,
          type: 'UserMessage',
          sender: coach.id,
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

const createGroup = async () => {
  const allCoaches = await getAllCoaches();
  const allCoachesIds = allCoaches.map(coach => coach.id);
  allCoachesIds.push(me.id);

  const conversationId = uuid.v4();

  await axios.put(
    `https://api.talkjs.com/v1/${APP_ID}/conversations/${conversationId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  await axios.put(
    `https://api.talkjs.com/v1/${APP_ID}/conversations/${conversationId}`,
    {
      participants: [me.id, ...allCoachesIds],
    },
    {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    },
  );

  try {
    await axios.post(
      `https://api.talkjs.com/v1/${APP_ID}/conversations/${conversationId}/messages`,
      [
        {
          text: 'This is your new group',
          type: 'SystemMessage',
        },
      ],
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );
  } catch (error) {
    console.log(error);
  }
};

export const APP_ID = 'toVJN9Eo';
export const API_KEY = 'sk_test_oUZWYCQxnfQanFeAJRza3aI870ld1jUG';
