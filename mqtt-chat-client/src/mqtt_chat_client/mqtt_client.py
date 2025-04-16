import json
import paho.mqtt.client as mqtt


def on_connect(client, userdata, flags, reason_code):
    print(f"Connected with result code {reason_code}")
    message = {
        "status": "MQTT Client says hello!"
    }
    client.publish(
        MQTTClient.base_topic + "/clientstate",
        json.dumps(message),
        0,
        False,
        MQTTClient.publish_properties
    )
    client.subscribe(MQTTClient.base_topic + "/" + MQTTClient.current_topic)


def on_disconnect(client, userdata, flags, reason_code):
    print(f"Disconnected with result code {reason_code}")
    message = {
        "status": "MQTT Client says goodbye!"
    }
    client.publish(
        MQTTClient.base_topic + "/clientstate",
        json.dumps(message),
        0,
        False,
        MQTTClient.publish_properties
    )


def on_message(client, userdata, msg):
    print(msg.topic + " " + str(msg.payload))
    MQTTClient.latest_message = msg.payload


class MQTTClient:
    base_url = '10.50.12.150'
    base_port = 1883
    base_topic = '/aichat'
    current_topic = 'default'

    latest_message = dict()

    client_id = 'Paho-MQTTClientPPMX'

    publish_properties = mqtt.Properties(mqtt.PacketTypes.PUBLISH)
    publish_properties.PayloadFormatIndicator = True
    publish_properties.ContentType = "application/json"

    def __init__(self):
        self.mqtt_client = mqtt.Client()
        self.connect()

    def connect(self):
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_message = on_message
        self.mqtt_client.on_disconnect = on_disconnect
        self.set_will()
        self.mqtt_client.connect(self.base_url, self.base_port)

    def set_will(self):
        message = {
            "status": "MQTT Client disconnected unexpectedly"
        }
        self.mqtt_client.will_set(
            self.base_topic + '/clientstate',
            json.dumps(message),
            0,
            False,
            self.publish_properties
        )

    def close(self):
        self.mqtt_client.loop_stop()

    def mqtt_start_loop(self):
        self.mqtt_client.loop_start()

    def send_chat_message(self, message):
        payload = {
            "sender": message["sender"],
            "text": message["text"],
            "clientId": self.client_id,
            "topic": message["topic"]
        }

        self.mqtt_client.publish(
            self.base_topic + "/" + message["topic"],
            json.dumps(payload),
            0,
            False,
            self.publish_properties
        )

        if self.current_topic != message["topic"]:
            self.change_topic(message["topic"])

    def change_topic(self, topic):
        self.mqtt_client.unsubscribe(self.current_topic)
        self.current_topic = topic
        self.mqtt_client.subscribe(self.current_topic)

    def get_chat_message(self):
        return self.latest_message


