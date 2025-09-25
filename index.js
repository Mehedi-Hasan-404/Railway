const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// Proxy route for streams
app.use(
  "/proxy",
  createProxyMiddleware({
    target: "http://103.182.170.32:8888",
    changeOrigin: true,
    pathRewrite: { "^/proxy": "" },
    ws: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "*",
    },
  })
);

// Health check
app.get("/", (req, res) => {
  res.send("✅ Stream Proxy Running");
});

// Use Railway/Render dynamic PORT + 0.0.0.0 binding
const PORT = process.env.PORT || 3000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
