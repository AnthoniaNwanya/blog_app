## Blog_app
##### Built With: 
- Node.js 
- Express.js 
- MongoDB
##### Clone this Repo: 
``` git clone https://github.com/AnthoniaNwanya/blog_app.git ```
##### Install Dependencies: 
``` npm install ```

###### User Model
```
({
  id: ObjectId,
  full_name: {
    type: String,
    required: [true, "can't be blank"],
  },
  email: {
    type: String,
    required: [true, "can't be blank"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "can't be blank"],
  },
  token: {
    type: String,
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
    },
  ],
});
```


###### Blog Model
```
({
  id: ObjectId,
  title: {
    type: String,
    unique: true,
  },
  content: {
    type: String,
  },
  author: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
    },
  ],
  state: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  reading_time: String,
  tags: Array,
  timestamp: Date,
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
});
```
###### Comment Model
```
({
  id: ObjectId,
  comment: {
    type: String,
  },
  timestamp: Date,
  blog: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Blog",
  },
  commenter: {
    type: String,
  },
});
```
###### Signup User
###### Route: /blogapp/user/signup
###### Method: POST
###### Body:
```
{
  "full_name": "Tonia Nwanya",
  "email": "tonia@yahoo.com",
  "password": "tonia"
} 
```

###### Responses
```
{
  "full_name": "Tonia Nwanya",
  "email": "tonia@yahoo.com",
  "password": "$2b$10$dCmCYEgkP7cjxp8ArI4L3uyYGKLE1BYLZihNyXUTp5eqVNWzAZ066",
  "blogs": [],
  "_id": "63c6a0cd9c3605da492cd70e",
  "__v": 0
}
```
###### Signin User
###### Route: /blogapp/user/signin
###### Method: POST
###### Body:
```
{
  "email": "tonia@yahoo.com",
  "password": "tonia"
}
```
###### Responses
```
{
  "_id": "63c6a0cd9c3605da492cd70e",
  "full_name": "Tonia Nwanya",
  "email": "tonia@yahoo.com",
  "password": "$2b$10$dCmCYEgkP7cjxp8ArI4L3uyYGKLE1BYLZihNyXUTp5eqVNWzAZ066",
  "blogs": [],
  "__v": 0,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ2YWxpZFVzZXJfaWQiOiI2MzY2ZTgzMDM4MWJhODgwMmEyNGU1YmMiLCJlbWFpbCI6ImNhdDFAeWFob28uY29tIiwiaWF0IjoxNjY3Njg4NjgyLCJleHAiOjE2Njc2OTIyODJ9.XJt1mdAP1zvdPs-kJxfLallyX9lxMB6v-lpBtS5zEuY"
}
```

###### Get Users
###### Route: /blogapp/user
###### Method: GET
###### Responses
```
{
    "_id": "63c6a0cd9c3605da492cd70e",
    "full_name": "Tonia Nwanya",
    "email": "tonia@yahoo.com",
    "password": "$2b$10$ay3kExxwaW/oeCbnIVmeNe7kv2.nB5P./Ua8jOoWorCnD1Z80jELS",
    "blogs": [],
    "__v": 1
  }
   ```
###### Get User By Id
###### Route: /blogapp/user/id:id
###### Method: GET
###### Responses
```
{
  "_id": "63c6a0cd9c3605da492cd70e",
  "full_name": "Tonia Nwanya",
  "email": "tonia@yahoo.com",
  "password": "$2b$10$ay3kExxwaW/oeCbnIVmeNe7kv2.nB5P./Ua8jOoWorCnD1Z80jELS",
  "blogs": [],
  "__v": 1
}
```
###### Create Blog
###### Route: /blogapp/blog
###### Method: POST
###### Header Authorization: Bearer {token}
###### Body:
 ``` { title: "Test Data, content: "Test data for a blog API", author: "Tonia Nwanya" } ```

###### Responses
```
{
  "title": "Test Data",
  "content": "Test data for a blog API",
  "author": [
    "63c6a0cd9c3605da492cd70e"
  ],
  "state": "draft",
  "likes": 0,
  "views": 0,
  "tags": [],
  "timestamp": "2023-01-17T22:21:16.882Z",
  "comments": [],
  "id": "63c6a0e19c3605da492cd712"
}
```

###### Get Blogs
###### Route: /blogapp/blog
###### Method: GET
###### Responses
```
{
  "status": true,
  "getBlog": [
    {
      "title": "Test Data",
      "content": "A test data for a blog API",
      "author": [
        {
          "_id": "63c6a0cd9c3605da492cd70e",
          "full_name": "Tonia Nwanya"
        }
      ],
      "state": "draft",
      "likes": 0,
      "views": 0,
      "tags": [],
      "timestamp": "2023-01-17T13:21:37.347Z",
      "comments": [],
      "id": "63c6a0e19c3605da492cd712"
    }
   ```

###### Get Blog by Id
###### Route: /blogapp/blog/id:id?
###### Method: GET
###### Responses

```
{
  "status": true,
  "blogId": [
    {
      "title": "Test Data",
      "content": "A test data for a blog API",
      "author": [
        {
          "_id": "63c6a0cd9c3605da492cd70e",
          "full_name": "Tonia Nwanya"
        }
      ],
      "state": "draft",
      "likes": 0,
      "views": 1,
      "tags": [],
      "timestamp": "2023-01-17T13:21:37.347Z",
      "comments": [],
      "id": "63c6a0e19c3605da492cd712"
    }
```


###### Update Blog
###### Route: /blogapp/blog:id?
###### Method: PUT
###### Header:
###### Authorization: Bearer {token}
###### Body:
 ``` { "state": "published" } ```
###### Responses
```

{
  "message":"Update was successful",
  "status": true,
  "updatedBlog": [
    {
      "title": "Test Data",
      "content": "A test data for a blog API",
      "author": [
        {
          "_id": "63c6a0cd9c3605da492cd70e",
          "full_name": "Tonia Nwanya"
        }
      ],
      "state": "published",
      "likes": 0,
      "views": 1,
      "tags": [],
      "timestamp": "2023-01-17T13:21:37.347Z",
      "comments": [],
      "id": "63c6a0e19c3605da492cd712"
    }
  
```


###### Delete Blog
###### Route: /blogapp/blog:id?
###### Method: DELETE
###### Header: Authorization: Bearer {token}
###### Responses
 
```
{
  "message":"Blog deleted successfully",
  "status": true,
  "delBlog": [
    {
      "title": "Test Data",
      "content": "A test data for a blog API",
      "author": [
        {
          "_id": "63c6a0cd9c3605da492cd70e",
          "full_name": "Tonia Nwanya"
        }
      ],
      "state": "published",
      "likes": 0,
      "views": 1,
      "tags": [],
      "timestamp": "2023-01-17T13:21:37.347Z",
      "comments": [ {
        "_id": "63c6a0f39c3605da492cd717",
        "comment": "A test comment"
      }],
      "id": "63c6a0e19c3605da492cd712"
    }
```
###### Post Comment
###### Route: /blogapp/comment:id?
###### Method: POST
###### Body:
 ``` { "comment": "A test comment" } ```
###### Responses

```
{
  "comment": "A test comment",
  "timestamp": "2023-01-17T22:56:40.932Z",
  "blog": {
    "title": "Test Data",
    "content": "Test data for a blog API",
    "author": [
      "63c6a0cd9c3605da492cd70e"
    ],
    "state": "published",
    "likes": 0
    "views": 1,
    "tags": [],
    "timestamp": "2023-01-17T13:21:37.347Z",
    "comments": [
      "63c6a0f39c3605da492cd717"
    ],
    "id": "63c6a0e19c3605da492cd712"
  },
  "_id": "63c6a0f39c3605da492cd717",
  "__v": 0
}```
