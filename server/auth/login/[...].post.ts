export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const body = await readBody(event);
  const query = getQuery(event);
  console.log("Request body:", body);
  console.log("Config:", config)
  console.log("Request query:", query);
  console.log("New request: " + getRequestURL(event));
});
