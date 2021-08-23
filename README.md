
# Translate API

A smart API which not only translates the text given by the user in desired langaugae but also caches the previous results to reduce the response time . 


## Deployment



If you dont have **Redis** installed ,install it with this [link](https://drive.google.com/file/d/1mgO8I-rf1Y9RD9UcqnfZ6HEHeHUbKsR5/view?usp=sharing) .
After that it would be ready to use on your localhost:3000

```bash
      npm install
      node index.js

```

## Design

Caching :\
A user enters the text to be translated . It get stored in cache . So next time if the desired result is found in cache the api does not get hit .

\
Smart Pre Caching : \
Suppose a User demands a text to be translated in Hindi . Web Server automatically stores the result in Urdu , Marathi , Gujrati , Punjabi . \
Thus saving the response time for the User. (Refer Map.js)


## Test Cases 

### You can choose your desired text and any language code from Lang.js


## How to test 

Step 1 : Install redis and deploy on localhost \
Step 2 : Go to Postman \
Set Url : "http://localhost:3000/translate"
Go to Body , Select xxx-www-form-urlencoded \
Step 3 : 



#### Get the Translated Word

```http
  GET /translate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `text` | `string` | **Required**. Text to be Translated |



| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `toTranslate`      | `string` | **Required**. Language in which it needs to be translated |

#### translate(text,toTranslate)

Takes two params and returns the Translated Word.



  
## Acknowledgements

 - [CodeYoung](https://www.codeyoung.com/)
 - [CodeYoung Internship Task](https://internshala.com/internship/detail/nodejs-development-work-from-home-job-internship-at-codeyoung1628930659)
 

  