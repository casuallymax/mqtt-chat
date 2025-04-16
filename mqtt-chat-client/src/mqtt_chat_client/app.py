from quart import Quart, request, websocket
from quart_cors import cors
from .mqtt_client import MQTTClient
import threading

app = Quart(__name__)
app = cors(app, allow_origin="http://localhost:4200")

mqtt_client = MQTTClient()


def mqtt_start_loop():
    mqtt_client.mqtt_start_loop()


thread = threading.Thread(target=mqtt_start_loop)
thread.daemon = True
thread.start()


@app.route('/ping')
def ping():
    response = 'Hello, World!'
    return response