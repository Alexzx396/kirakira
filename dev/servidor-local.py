"""Servidor de pruebas local para la web de Ether Dreams.

Imita las reglas del .htaccess de Hostinger:
  - /information sirve information.html
  - /information.html redirige a /information
  - /index y /index.html redirigen a /
  - Las direcciones que no existen muestran 404.html

Uso (desde la carpeta del proyecto):
    python dev/servidor-local.py          -> http://localhost:8765
    python dev/servidor-local.py 9000     -> otro puerto
También queda accesible desde el celular en la misma red Wi-Fi (http://IP-del-PC:8765).
"""
import http.server
import os
import socket
import sys
from urllib.parse import unquote, urlsplit

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 8765


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ROOT, **kwargs)

    def end_headers(self):
        # Sin caché: cada recarga muestra los últimos cambios
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def _redirect(self, location):
        self.send_response(301)
        self.send_header("Location", location)
        self.end_headers()

    def _route(self):
        parts = urlsplit(self.path)
        path, query = parts.path, ("?" + parts.query if parts.query else "")

        if path in ("/index", "/index.html"):
            self._redirect("/" + query)
            return False
        if path.endswith(".html"):
            self._redirect(path[:-5] + query)
            return False
        if path.startswith("/dev"):
            self._not_found()
            return False

        local = os.path.join(ROOT, unquote(path).lstrip("/"))
        if path != "/" and not os.path.exists(local) and os.path.isfile(local + ".html"):
            self.path = path + ".html" + query
        elif not os.path.exists(local):
            self._not_found()
            return False
        return True

    def _not_found(self):
        # Como ErrorDocument 404 /404.html en el .htaccess
        with open(os.path.join(ROOT, "404.html"), "rb") as f:
            body = f.read()
        self.send_response(404)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        if self.command != "HEAD":
            self.wfile.write(body)

    def do_GET(self):
        if self._route():
            super().do_GET()

    def do_HEAD(self):
        if self._route():
            super().do_HEAD()


def lan_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except OSError:
        return None


if __name__ == "__main__":
    server = http.server.ThreadingHTTPServer(("0.0.0.0", PORT), Handler)
    print(f"Servidor de pruebas en http://localhost:{PORT}")
    ip = lan_ip()
    if ip:
        print(f"Desde el celular (misma Wi-Fi): http://{ip}:{PORT}")
    print("Ctrl+C para detenerlo.")
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass
