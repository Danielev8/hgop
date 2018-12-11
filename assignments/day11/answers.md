# Day 11

## Answer to Day11 questions

**Question:** Explain why we put each consecutive call inside the onSuccess callback of the previous database call instead of just placing them next to eachother

The reason we put each consecutive call inside the onSuccess callback of the previous database call is because the database should only handle a limited number of client connections at a time and to avoid crashing or failure it is better to call one at a time, and JavaScript(NodeJS) is a interpreted programming language it does not read line by line like traditional languages such as C++, java and so on. Furthermore these functions are asyncronous (relies on callbacks) they will pass on success or fail from the innermost function outwards, therefore if one fails it will pass on an error callback which is then passed on recursively stopping the rest of the functions.