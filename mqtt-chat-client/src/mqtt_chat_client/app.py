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


@app.route('/send', methods=['Put'])
async def send_message():
    message = (await request.get_json())
    mqtt_client.send_chat_message(message)
    return {"msg": "Success"}, 200


@app.websocket('/ws')
async def ws():
    while True:
        message = mqtt_client.get_chat_message()
        if message:
            await websocket.send(message)
