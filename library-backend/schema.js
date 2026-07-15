const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: Author!,
    id: ID!,
    genres: [String!]!,
  }

  type Author {
    name:String!,
    id:ID!,
    born:Int,
    bookCounts: Int,}
  
  type User {
  username: String!
  favoriteGenre: String!
  id: ID!}

  type Token {
  value: String!}

  type Subscription {
  bookAdded: Book!
}    
  
  type Query {
    bookCount: Int!,
    allBooks(author:String, genre:String):[Book!]!,
    authorCount: Int!,
    allAuthors: [Author!]!,
    findAuthor(name:String!):Author
    me: User}
    
  type Mutation{
  addBook(
    title: String!,
    published: Int!,
    author: String!,
    genres: [String!]!,):Book

  editAuthor(
    name:String!,
    setBornTo:Int!):Author
    
  createUser(username: String!, favoriteGenre: String!): User

  login(username: String!, password: String!): Token
  
  _resetDatabase: Boolean}`;

module.exports = typeDefs;
