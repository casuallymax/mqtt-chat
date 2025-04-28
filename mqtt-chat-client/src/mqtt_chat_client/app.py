from quart import Quart, request, websocket
from quart_cors import cors
from .mqtt_client import MQTTClient

app = Quart(__name__)
app = cors(app, allow_origin="http://localhost:4200")

mqtt_client = MQTTClient()
mqtt_client.mqtt_start_loop()


@app.route('/ping')
def ping():
    response = 'Hello, World!'
    return response


@app.route('/send', methods=['Put'])
async def send_message():
    message = (await request.get_json())
    mqtt_client.send_chat_message(message)
    return {"msg": "Success"}, 200


@app.route('/get')
async def get_messages():
    return mqtt_client.get_chat_messages(), 200