# Portal del cliente · LexMonitor v1.1
Para verlo: `cd /workspace/dev/lexmonitor-portal/v1 && python3 -m http.server 8796` y abra:
- http://127.0.0.1:8796/index.html: portal del cliente
- http://127.0.0.1:8796/abogado.html: vista del abogado (ábrala en otra pestaña para ver la sincronía)
- http://127.0.0.1:8796/split.html: las dos vistas juntas
Pruebas: `node ../test/e2e.js`. Grabaciones: `node ../test/grabar.js [toma]`. PDF: `python3 docs/generar_pdfs.py`.
Claves localStorage: lmportal_proceso, lmportal_mensajes, lmportal_enlace, lmportal_internas, lmportal_version.
