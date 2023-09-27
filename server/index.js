//ApolloServer is a class which extends ApolloServerExpress
const {ApolloServer} = require("apollo-server");
const {typeDefs} = require('./schema/typeDefs');
const {resolvers} = require('./schema/resolvers');

//create an instance from ApolloServer class which takes typeDefs and resolvers as input
const server = new ApolloServer({
    typeDefs,
    resolvers
});

//server.listen() will return the promise which consists of URL
server.listen().then(({url}) => {
    console.log(`Your API is Running at ${url}`);
})