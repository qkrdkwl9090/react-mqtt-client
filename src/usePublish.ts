import { MqttClient } from 'mqtt';

const usePublish = (client: MqttClient | null) => {
  const publish = (topic: string, message: string) => {
    if (!client || !client.connected) {
      throw new Error('MQTT client is not connected');
    }

    client.publish(topic, message, (err) => {
      if (err) {
        throw new Error(
          `Failed to publish message to topic "${topic}": ${err.message}`,
        );
      }
    });
  };

  return publish;
};

export default usePublish;
