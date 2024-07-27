/* 
server- storing certain book data
using register
subscriber

this is  a bok record management api server / backend for the library sysytem or management of records or manuals or books 

Fine System :
user : 6/3/24- -6/6/24
7/6/24 => 50


#subscription types
3months(basic)
6 months (standard)
12 months (premium)

if the subscription type is standard && if the subscription date is 6/3/24
=>(valid upto septhember)

within subscription date , if we miss the renewal >> fine is 50/-day
but if subscription is over and renewal is notdone >> 100+50/-day

    #routes and endpoints
post: generate a new user
get- get all the user info here

user{id}
get :get a user by id
put : update a user by their id
delete : delete a user by id ( check if he/she have an issued stuff from library )&&(is there any fine to paid )


user/subscription -details /{id}
get: get user subscription details 
   >>date of subscription
   >>valid till
   >> is there any fine



#/books
get : get all the books 
post : create or add a new book

/books{id}
get : get book by a particular id 
put : update a book by id

/books/issued
get : get all issued books 


/books/issued/withfine
get: get all issued books with their fines

*/

// mongodb
/*
>>M: Model (bundle view and controller , depicts the structure of mongodb)
>>V: View (with respect to front end)
>> C : Controllers (brain or logical part of a router)
     >>books.controllers.js
     >>users.controllers.js


Schema >> 
id:String 
name:String 
age: Number

Model>> 
id: 
name: 
age: 
{no data -type restriction as such }
*/

/**
  data transfer object 
  var obj1:{
      name 
      age
      id
      gender
  }
      ||
      ||
      ||
      ||
  var obj2:{
         name 
         age
         id
  }
         so dto is transfering information one object to another object
 */
