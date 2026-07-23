const http = require("http");
const fs = require("fs");
const path = require("path");
const ROOT = __dirname;
const PORT = Number(process.env.PORT || 4174);
const MIME = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".png": "image/png", ".svg": "image/svg+xml; charset=utf-8", ".xml": "application/xml; charset=utf-8", ".txt": "text/plain; charset=utf-8" };
function cacheControl(ext) {
  if ([".css", ".js", ".png", ".svg"].includes(ext)) return "public, max-age=3600";
  return "no-cache";
}
http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  if (urlPath === "/beginner-guide" || urlPath === "/beginner-guide.html") { res.writeHead(301, { Location: "/guide.html" }); return res.end(); }
  let file = path.join(ROOT, urlPath);
  if (!file.startsWith(ROOT)) { res.writeHead(403); return res.end("Forbidden"); }
  fs.stat(file, (statErr, stat) => {
    if (statErr || !stat.isFile()) {
      const notFound = path.join(ROOT, "404.html");
      return fs.readFile(notFound, (error, data) => {
        if (error) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" }); return res.end("Not found"); }
        res.writeHead(404, { "Content-Type": MIME[".html"], "Cache-Control": "no-cache", "X-Content-Type-Options": "nosniff" });
        res.end(data);
      });
    }
    const ext = path.extname(file);
    const etag = `"${stat.size}-${Math.floor(stat.mtimeMs)}"`;
    const headers = { "Content-Type": MIME[ext] || "application/octet-stream", "Cache-Control": cacheControl(ext), "Last-Modified": stat.mtime.toUTCString(), "ETag": etag, "X-Content-Type-Options": "nosniff" };
    if (req.headers["if-none-match"] === etag) { res.writeHead(304, headers); return res.end(); }
    fs.readFile(file, (err, data) => {
      if (err) { res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8", "X-Content-Type-Options": "nosniff" }); return res.end("Not found"); }
      res.writeHead(200, headers);
      res.end(data);
    });
  });
}).listen(PORT, () => console.log("Preview: http://localhost:" + PORT));
