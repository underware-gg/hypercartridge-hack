export default {
  port: 3000,
  fetch(request: Request) {
    return new Response("Welcome to Bun!");
  },
};
