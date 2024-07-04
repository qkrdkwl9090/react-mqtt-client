import { useState, useEffect } from 'react';
import mqtt, { MqttClient, IClientOptions } from 'mqtt';

const useMQTT = (url: string, options?: IClientOptions) => {
  const [client, setClient] = useState<MqttClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const mqttClient = mqtt.connect(url, options);

    mqttClient.on('connect', () => {
      setIsConnected(true);
      setError(null);
    });

    mqttClient.on('reconnect', () => {
      setIsConnected(false);
    });

    mqttClient.on('close', () => {
      setIsConnected(false);
    });

    mqttClient.on('error', (err) => {
      setError(err.message);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, [url, options]);

  return { client, isConnected, error };
};

export default useMQTT;
