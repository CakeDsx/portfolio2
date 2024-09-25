import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { serveStatic } from "@hono/node-server/serve-static";
import { readFile, writeFile } from "node:fs/promises";
import path from "path";

const app = new Hono();
app.use("/*", cors({
  origin: 'http://localhost:5173', 
}));

app.use("/statics/*", serveStatic({ root: "./" }));

app.get("/getjson", async (c) => {
  try {
    const data = await readFile(path.join(__dirname, "projects.json"), "utf-8");
    return c.json(JSON.parse(data));
  } catch (err) {
    console.error("Error reading projects.json:", err);
    return c.text("Failed to read projects.json", 500);
  }
});

app.post("/postjson", async (c) => {
  const fileName = path.join(__dirname, "projects.json");
  let tempdata;

  try {
    const data = await readFile(fileName, "utf-8");
    tempdata = JSON.parse(data);
  } catch (err) {
    console.error(`Error reading: ${fileName}`, err);
    return c.text(`Failed to read: ${fileName}`, 500);
  }

  const body = await c.req.json();

  const title = Object.keys(body)[0];
  if (!title) {
    return c.text("Project title is missing", 400);
  }

  tempdata[title] = body[title];
  const newData = JSON.stringify(tempdata, null, 2);
  
  try {
    await writeFile(fileName, newData, "utf-8");
    console.log("Project added successfully:", title);
  } catch (err) {
    console.error(`Error writing to: ${fileName}:`, err);
    return c.text(`Failed to write to: ${fileName}`, 500);
  }

  return c.text('Created!', 201);
});

const port = 3000; 
console.log("Server is running on port:", port);

serve({
  fetch: app.fetch,
  port,
});
