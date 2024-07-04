import { useEffect, useState } from 'react';
import { MqttClient } from 'mqtt';

const useUnsubscribe = (client: MqttClient | null, topic: string) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!client) return;

    const handleUnsubscribe = () => {
      client.unsubscribe(topic, (err) => {
        if (err) {
          setError(
            `Failed to unsubscribe from topic "${topic}": ${err.message}`,
          );
        }
      });
    };

    return () => {
      handleUnsubscribe();
    };
  }, [client, topic]);

  return { error };
};

export default useUnsubscribe;
