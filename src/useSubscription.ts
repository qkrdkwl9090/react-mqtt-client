import { useEffect, useState } from 'react';
import { MqttClient } from 'mqtt';

const useSubscription = (client: MqttClient | null, topic: string) => {
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    client.subscribe(topic, (err) => {
      if (err) {
        setError(`Failed to subscribe to topic "${topic}": ${err.message}`);
      }
    });

    const handleMessage = (receivedTopic: string, payload: Buffer) => {
      if (receivedTopic === topic) {
        setMessage(payload.toString());
      }
    };

    client.on('message', handleMessage);

    return () => {
      client.unsubscribe(topic, (err) => {
        if (err) {
          setError(
            `Failed to unsubscribe from topic "${topic}": ${err.message}`,
          );
        }
      });
      client.off('message', handleMessage);
    };
  }, [client, topic]);

  return { message, error };
};

export default useSubscription;
