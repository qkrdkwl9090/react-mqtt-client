import { useEffect } from 'react';
import { MqttClient } from 'mqtt';

const useMQTTMessageHandler = (
  client: MqttClient | null,
  topic: string,
  callback: (message: string) => void,
) => {
  useEffect(() => {
    if (!client) return;

    const handleMessage = (receivedTopic: string, payload: Buffer) => {
      if (receivedTopic === topic) {
        callback(payload.toString());
      }
    };

    client.on('message', handleMessage);

    return () => {
      client.off('message', handleMessage);
    };
  }, [client, topic, callback]);
};

export default useMQTTMessageHandler;
