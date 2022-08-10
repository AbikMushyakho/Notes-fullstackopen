# Heroku
[https://notes-application-full-stack.herokuapp.com/](https://notes-application-full-stack.herokuapp.com/)



# EsLint 
Generically, lint or a linter is any tool that detects and flags errors in programming languages, including stylistic errors. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.

1. Installation : `npm install eslint --save-dev`
2. initlize eslint in project : `node_modules/.bin/eslint --init`

 more about [ESlint](https://fullstackopen.com/en/part3/validation_and_es_lint#lint)<br/>
[Airbnb Package](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)


# Unit testing using jest
 
 a. install jest as a development dependency- 
 `npm install jest --save-dev `

```
"scripts": {
    //...
    "test":"jest --verbose"
    } 
```
b. add the following to the end of package.json:
```
{
 //...
 "jest": {
   "testEnvironment": "node"
 }
}
```
// OR
create *jest.config.js* file and add configuration as given below;

```
module.exports = {
  testEnvironment :'node'
}
```

c. add 'jest':true in .eslintrc.js file with "node":true 



# Backend Testing

## Test environment
  1. change in package.json file
```
   "start": "NODE_ENV=production node index.js",
    "dev": "NODE_ENV=development nodemon index.js",
    "test": "NODE_ENV=test jest --verbose --runInBand"
```
  2. If not working on windows then install *cross-env* package
`npm install cross-env --save-dev`

3. achieve cross-platform compatibility by using the cross-env
```
 "start": "cross-env NODE_ENV=production node index.js",
  "dev": "cross-env NODE_ENV=development nodemon index.js",
  "test": "cross-env NODE_ENV=test jest --verbose --runInBand",

```
4. if hosting on heroku then install *cross-env* as production
`npm install cross-env -P` 

## Super test to test API
a. installtion `npm install supertest --save-dev`

b. Test notes return a json 
```
const mongoose =require('mongoose')
const supertest =require('supertest')
const app = require('../app')

const api = supertest(app)
test('notes are returned as json',async() => {
  await api.get('/api/notes').expect(200).expect('Content-Type',/applicaion\/json/)
})

afterAll(() => {
  mongoose.connection.close()
})
```

c. Mongodb doesnot suppport jest for testing but we can do it by addding this command
`"test": "cross-env NODE_ENV=test jest --verbose --runInBand --forceExit"`

d. extend jest timeout
  => add third parameter in test function as *1000000*



### Avoiding try catch block by handling error 
the error is handled by new npm  package called *express-async-error*

a. Initialize `npm install express-async-errors`
b. usages  `require('express-async-errors)`



# User Administration
Store notes object ids as an array of Mongoos in *models/user.js* file
The user schema can contain the following to store the object ids
```
{
  type:mongoose.Schema.Types.ObjectId,
  ref:'Note'
}
```

add reference in *model/note.js* file to know who created the note.
```
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }

```
## Creating Users 
Instead of storing plan text password, Bcrypt is the suitable package which is used to generated the password hashes also including the salt rounds.

usages
`npm install bcrypt`

### populate in mongoose
`await Note.find({}).populate('user',{ username:1,name:1 })`

# Token Authentication
lets intalls a jsonwebtoken which generates the JSON web tokens.

`npm install jsonwebtoken`

# Part 5 
a. Login in frontend

## Prop types in frontend
it helps to set the attribute type of the props
`npm install prop-types`

Usages
```
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  // ..
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}
```

### React test with ESLINT 
`npm install --save-dev eslint-plugin-jest`