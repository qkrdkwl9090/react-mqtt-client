import { useEffect, useState } from 'react';
import { MqttClient } from 'mqtt';

const useSubscribe = (client: MqttClient | null, topic: string) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    const handleError = (err: Error) => {
      setError(`Failed to subscribe to topic "${topic}": ${err.message}`);
    };

    client.subscribe(topic, (err) => {
      if (err) {
        handleError(err);
      }
    });

    return () => {
      client.unsubscribe(topic, (err) => {
        if (err) {
          setError(
            `Failed to unsubscribe from topic "${topic}": ${err.message}`,
          );
        }
      });
    };
  }, [client, topic]);

  return { error };
};

export default useSubscribe;
