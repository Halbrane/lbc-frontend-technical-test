# Context :

At leboncoin, our users can share messages about a transaction, or ask for informations about any products.

Your job is to create the interface to consult those messages.
The interface needs to work on both desktop & mobile devices.

In addition to your code, a README explaining your thought process and your choices would be appreciated.

# Exercice :

- Display a list of all the conversations
- Allow the user to select a conversation
  - Inside the conversation, there is a list of all the messages between these two users.
  - As a user, you can type and send new messages in this conversation

# Launch servers on the projet :

- npm run dev
- npm run start-server

# Explain the method :

Steps :
- Understand the subject. 
- Plan list of features.
- Create a simple design.
- Learn Typescript and Next.js to do the excercice.
- Start to code.
- Add data in Database to test different use cases.
- Debug.
- Refactoring and add notes.
- Final check.

# Features :

This is a responsive chat where you can have a conversation with user in a list. 

New conversation :

 - Add a new conversation on the select options.
 - Displays a list of users with whom you can have a conversation. If you have a conversation active with one of the user, the user is no longer in the list.

(Relaunch Backend server to see the changes because new objects aren't returned otherwise)

Displays previews :
 - Select preview and start to chat with user.
 - Deleted (to come)

Displays conversation : 

 - Displays list of message in a conversation between two users.
 - Add a new message in the conversation.

(Relaunch Backend server to see the changes because new objects aren't returned otherwise)

# Backend message verification :

- Add verification in server/middleware/messages to test if messages that are displayed belong to sender or recipient. (-> Error in BD). 
To do : - Ensure message author is authenticated user.
- Send message only on user conversations.
- At this point, we can't delete because the here nothing on the route to delete "/conversation/convId".


# To improve :

- Use Next for the authentification, for using "session" to have user informations all around your app and to logout.
- Use Websocket for notifications and display new messages in realtime.
- Write verifications in the back to send informations to the front and display message for user. (You can't do important verifications in the front because it doesn't garantee anything).
- Write some tests for the components.
- The button Logout is not displayed on web mobile. I will find a way to make this fancy.

# Thanks:

Thank you for the exercice, I learned a lot of new things.
  

