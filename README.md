# Project Name

Server Side Calculator

## Description

This calculator does exactly what you expect, but does all arithmetic on the backend. 

This project came with plenty of problems to solve: 

MODULES: 
- I chose from the very beginning to store all my functions and the array of all calculation objects in modules. I was very careful to test often to make sure I was calling these assets correctly. 


WHEN TO POST TO DOM: 
- I played a lot with when and where to append items to the DOM: it was really important to me to get the solutions on the DOM in addition to the equations, but of course the solutions don't exist until after the POST is complete and the new GET is called. 

- In the end I added a condition to the first ajax GET request to check if there is anything returned, and if so, then to post to the DOM. 

ROUTES: 
- I struggled with whether or not to create a second route on which to get the solutions - all I did was generate a new object property with the solutions. I did not test if there would be a conflict with using the /calc route for all get and post requests. I am happy with the end result either way.

POST VALIDATION: 
- The only part of this calculator that I am not satisfied with is the condition I wrote to validate whether the post is correct or not. After playing with it for a while, I wasn't inspired by anything better than checking the length of the array. This is something I would like to come back to later.

STYLES:
- Styling the interface to resemble a typical calculator required the use of secret buttons with my limited bootstrap experience. 

DELETE: 
- I am not sure I implemented the 'delete' method correctly - but I was able to get it to do what I wanted. I had a difficult time finding resources for handling the delete method between Ajax and Express.

In the end I am pleased with the outcome: the calculator functions as expected (generally), but can be broken by a determined individual. 
