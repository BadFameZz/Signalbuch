import http.server
import socketserver
import socket

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except:
        return "127.0.0.1"

PORT = 8000
Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    local_ip = get_local_ip()
    print(f"\nServer läuft auf: \nhttp://{local_ip}:{PORT}")
    print("\nÖffne diese Adresse in deinem iPhone-Browser")
    print("\nZum Beenden Strg+C drücken\n")
    httpd.serve_forever()
    print("\nÖffne diese Adresse in deinem iPhone-Browser")
    print("\nZum Beenden Strg+C drücken\n")
    httpd.serve_forever()
