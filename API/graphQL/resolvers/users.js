require('dotenv').config()
const { ApolloError } = require('apollo-server-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Model
const User = require('../../models/User')

module.exports = {
   Mutation: {
      async registerUser(_, { registerInput: { username, email, password } }) {
         // See if an old user exists with the same email attempting to register
         const oldUser = await User.findOne({ email })

         // Throw error if that user exists
         if (oldUser) {
            throw new ApolloError('User already exists with the email' + email, 'USER_ALREADY_EXISTS')

         }

         // Hash the password
         let hashedPassword = await bcrypt.hash(password, 12)

         // Build mongoose model (User)
         const newUser = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword,
         })

         // Create JWT (attach to User model)
         const token = jwt.sign(
            { id: newUser._id, email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
         )

         newUser.token = token

         // Save user to DB
         const res = await newUser.save()

         // Return user
         return {
            id: res._id,
            ...res._doc
         }
      },
      async loginUser(_, { loginInput: { email, password } }) {
         // See if user exists
         const user = await User.findOne({ email })

         // Throw error if user doesn't exist
         if (user && (await bcrypt.compare(password, user.password))) {
            // Create JWT 
            const token = jwt.sign(
               { id: user._id, email },
               process.env.JWT_SECRET,
               { expiresIn: '1h' }
            )
            //(attach to User model)
            user.token = token
            // Return user
            return {
               id: user._id,
               ...user._doc
            }
         } else {
            // Throw error if user doesn't exist
            throw new ApolloError('Wrong credentials', "INVALID_CREDENTIALS")
         }
      },
   },
   Query: {
      user: (_, { ID }) => User.findById(ID)
   }
}