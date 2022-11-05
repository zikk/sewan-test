export default `
  type SendMessageResponse {
    created: Boolean
  }

  type Status {
    status: String
    sentAt: String
    target: String
    failMessage: String
  }

  type Message {
    id: String
    createdAt: String
    status: String
    content: String
    statuses: [Status]
  }

  type Query {
    getMessages: [Message]
  }

  type Mutation {
    sendMessage(message: String): SendMessageResponse
  }
`;
