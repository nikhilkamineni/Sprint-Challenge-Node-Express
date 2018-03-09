## Questions
1. What is Node?
  Node is an Javascript environment that executes server-side code. Previously Javascript was only used on the client-side but Node makes it possible to write the entire stack in JS.
2. What is Express?
  Express is the standard server framework for Node that is used for building web app and API's.
3. What is Middleware?
  Middleware is, essentially, functions that handle requests. Often described as 'software glue', it is used to connect different parts of the stack that may not necessarily be to pass data to each other otherwise.
4. What is an endpoint?
  An endpoint is the address that a client will use to make a specific request. In the codebase it is typically referred to in relation to the base address. For example: the endpoints of `'/users'` and `'/search'` could actually `http://localhost:3000/users` and `http://locahost:3000/users` (assuming you are running a local server at port 3000).
