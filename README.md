# MQTT-Chat

## Setup Backend

### Poetry

In diesem Projekt wird Poetry für das Dependeny Management der Python-Umgebung verwendet.
Es wird mindestens Python Version 3.11 benötigt.

Für die Installation siehe Poetry Docu: https://python-poetry.org/docs/

Installieren der Dependencies:
```bash
cd mqtt-chat-client
poetry install
```

Starten des Servers:
```bash
poetry run quart run
```

## Setup Frontend
### Angular

- Angular CLI 19.2.7
- Node 22.15.0
- NPM 10.9.2

Installation der Anwendung:
```bash
cd chat-frontend
npm install
```

Starten des Frontends:
```bash
ng serve
```