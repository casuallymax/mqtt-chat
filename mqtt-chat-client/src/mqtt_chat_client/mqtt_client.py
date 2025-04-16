import json

import paho.mqtt.client as mqtt


def on_connect(client, userdata, flags, reason_code):
    print(f"Connected with result code {reason_code}")
    message = {
        "status": "MQTT Client says hello!"
    }
    client.publish(MQTTClient.base_topic + "/clientstate", json.dumps(message), 0, False, MQTTClient.publish_properties)


def on_disconnect(client, userdata, flags, reason_code):
    print(f"Disconnected with result code {reason_code}")
    message = {
        "status": "MQTT Client says goodbye!"
    }
    client.publish(MQTTClient.base_topic + "/clientstate", json.dumps(message), 0, False, MQTTClient.publish_properties)


class MQTTClient:
    base_url = '10.50.12.150'
    base_port = 1883
    base_topic = '/aichat'

    publish_properties = mqtt.Properties(mqtt.PacketTypes.PUBLISH)
    publish_properties.PayloadFormatIndicator = True
    publish_properties.ContentType = "application/json"

    def __init__(self):
        self.mqtt_client = mqtt.Client()
        self.connect()

    def connect(self):
        self.mqtt_client.on_connect = on_connect
        self.mqtt_client.on_disconnect = on_disconnect
        self.mqtt_client.connect(self.base_url, self.base_port)

    def close(self):
        self.mqtt_client.loop_stop()

    def mqtt_start_loop(self):
        self.mqtt_client.loop_start()