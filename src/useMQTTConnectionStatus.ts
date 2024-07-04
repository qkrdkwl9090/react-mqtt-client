import { useEffect, useState } from 'react';
import { MqttClient } from 'mqtt';

const useMQTTConnectionStatus = (client: MqttClient | null) => {
  const [status, setStatus] = useState('disconnected');

  useEffect(() => {
    if (!client) return;

    const handleConnect = () => setStatus('connected');
    const handleDisconnect = () => setStatus('disconnected');
    const handleReconnect = () => setStatus('reconnecting');
    const handleError = (err: Error) => {
      setStatus('error');
      console.error(`MQTT connection error: ${err.message}`);
    };

    client.on('connect', handleConnect);
    client.on('close', handleDisconnect);
    client.on('reconnect', handleReconnect);
    client.on('error', handleError);

    return () => {
      client.off('connect', handleConnect);
      client.off('close', handleDisconnect);
      client.off('reconnect', handleReconnect);
      client.off('error', handleError);
    };
  }, [client]);

  return status;
};

export default useMQTTConnectionStatus;
