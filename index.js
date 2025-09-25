const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

// 📺 Channel list with their own cookies
const channels = [
  {
    route: "/sony1.m3u8",
    path: "/cdn/live/sony_sports_1_hd/playlist.m3u8",
    cookie: "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9ibGRjbXByb2QtY2RuLnRvZmZlZWxpdmUuY29t:Expires=1758979887:KeyName=prod_linear:Signature=S04FglHJFi_xTXsJ0gFBgpLqPsdiska9QFmHaGHrOGcOiezIcYy2oehEWpDVhvoy1WaSITRC8gXdG92rN7rZAQ"
  },
  {
    route: "/sony5.m3u8",
    path: "/cdn/live/sony_sports_5_hd/playlist.m3u8",
    cookie: "Edge-Cache-Cookie=URLPrefix=aHR0cHM6Ly9ibGRjbXByb2QtY2RuLnRvZmZlZWxpdmUuY29t:Expires=1758979887:KeyName=prod_linear:Signature=S04FglHJFi_xTXsJ0gFBgpLqPsdiska9QFmHaGHrOGcOiezIcYy2oehEWpDVhvoy1WaSITRC8gXdG92rN7rZAQ"
  }
];

// 🎯 Base target
const target = "https://bldcmprod-cdn.toffeelive.com";

// 🛠 Create proxy per channel
channels.forEach(ch => {
  app.use(
    ch.route,
    createProxyMiddleware({
      target,
      changeOrigin: true,
      pathRewrite: { [`^${ch.route}`]: ch.path },
      headers: {
        Cookie: ch.cookie,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
      }
    })
  );
});

// ✅ Health check
app.get("/", (req, res) => res.send("✅ Railway Stream Proxy Running"));

// 🚀 Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Proxy server running on http://localhost:${PORT}`)
);
