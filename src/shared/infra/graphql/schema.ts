export default `
  enum MessageTarget {
    LOG
    EMAIL
    HTTP
    SMS
    SLACK
  }

  type Query {
    hello: String
  }

  type Mutation {
    sendMessage(taget: MessageTarget, message: String): Boolean
  }
`;
