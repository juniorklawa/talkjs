// useEffect(() => {
//   const fetchData = async () => {
//     const allCoaches = await getAllCoaches();

//     let pastConversations = [];

//     try {
//       const {data} = await axios.get(
//         `https://api.talkjs.com/v1/${APP_ID}/users/${me.id}/conversations`,
//         {
//           headers: {
//             Authorization: `Bearer ${API_KEY}`,
//           },
//         },
//       );

//       pastConversations = data.data;
//     } catch (error) {
//       console.log(error);
//     }

//     const conversationsWithDetails = await Promise.all(
//       pastConversations.map(async (conversation: any) => {
//         const otherParticipantId = Object.keys(conversation.participants).find(
//           id => id !== me.id,
//         );
//         const participantInfo = await axios.get(
//           `https://api.talkjs.com/v1/${APP_ID}/users/${otherParticipantId}`,
//           {
//             headers: {
//               Authorization: `Bearer ${API_KEY}`,
//             },
//           },
//         );

//         return {
//           ...conversation,
//           participantPhotoUrl: participantInfo.data.photoUrl,
//           participantName: participantInfo.data.name,
//           otherParticipantId,
//         };
//       }),
//     );

//     const notInitiatedConversation = allCoaches.filter(
//       coach =>
//         !conversationsWithDetails
//           .map(c => c.otherParticipantId)
//           .includes(coach.id),
//     );

//     console.log(notInitiatedConversation);

//     setConversations(conversationsWithDetails);
//   };

//   fetchData();
// }, []);
