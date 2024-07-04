# React MQTT Hooks Library

A custom React Hooks library to easily integrate MQTT protocol into your React applications. Built with TypeScript, this library provides simple and intuitive hooks for managing MQTT connections, subscriptions, and messaging, making it easier to use MQTT in a React environment.

### Features

- Easy-to-use hooks: `useMQTT`, `useSubscription`, `useSubscribe`, `useUnsubscribe`, `usePublish`, `useMQTTConnectionStatus`, `useMQTTMessageHandler`
- TypeScript support
- Automatic reconnection handling
- Lightweight and performant

### Installation

```bash
npm install @tony9090/react-mqtt-hooks
```

### Importing Hooks

```typescript
import {
  useMQTT,
  useSubscription,
  useSubscribe,
  useUnsubscribe,
  usePublish,
  useMQTTConnectionStatus,
  useMQTTMessageHandler,
} from 'react-mqtt-hooks';
```

### Hook Descriptions

#### `useMQTT`

- **Description**: Initializes the MQTT client and manages connection state.
- **Parameters**: `url` (string), `options` (IClientOptions, optional)
- **Returns**: `{ client, isConnected, error }`

#### `useSubscription`

- **Description**: Manages subscription to a specific topic and handles received messages.
- **Parameters**: `client` (MqttClient), `topic` (string)
- **Returns**: `{ message, error }`

#### `useSubscribe`

- **Description**: Subscribes to a specific topic.
- **Parameters**: `client` (MqttClient), `topic` (string)
- **Returns**: `{ error }`

#### `useUnsubscribe`

- **Description**: Unsubscribes from a specific topic.
- **Parameters**: `client` (MqttClient), `topic` (string)
- **Returns**: `{ error }`

#### `usePublish`

- **Description**: Publishes a message to a specific topic.
- **Parameters**: `client` (MqttClient)
- **Returns**: `publish` (function)

#### `useMQTTConnectionStatus`

- **Description**: Tracks the MQTT connection status.
- **Parameters**: `client` (MqttClient)
- **Returns**: `status` (string)

#### `useMQTTMessageHandler`

- **Description**: Handles messages for a specific topic using a callback function.
- **Parameters**: `client` (MqttClient), `topic` (string), `callback` (function)
- **Returns**: None

### Usage Example

```tsx
import React, { useState } from 'react';
import {
  useMQTT,
  useSubscription,
  useSubscribe,
  useUnsubscribe,
  usePublish,
  useMQTTConnectionStatus,
  useMQTTMessageHandler,
} from 'react-mqtt-hooks';

const Example = () => {
  const {
    client,
    isConnected,
    error: connectionError,
  } = useMQTT('ws://broker.hivemq.com:8000/mqtt');
  const { message, error: subscriptionError } = useSubscription(
    client,
    'test/topic',
  );
  const { error: subscribeError } = useSubscribe(client, 'another/topic');
  const { error: unsubscribeError } = useUnsubscribe(client, 'another/topic');
  const publish = usePublish(client);
  const status = useMQTTConnectionStatus(client);
  useMQTTMessageHandler(client, 'test/topic', (msg) => {
    console.log('Message received: ', msg);
  });

  const [input, setInput] = useState('');

  const handlePublish = () => {
    publish('test/topic', input);
    setInput('');
  };

  return (
    <div>
      <p>Connection Status: {isConnected ? 'Connected' : 'Disconnected'}</p>
      {connectionError && <p>Error: {connectionError}</p>}
      {subscriptionError && <p>Error: {subscriptionError}</p>}
      {subscribeError && <p>Error: {subscribeError}</p>}
      {unsubscribeError && <p>Error: {unsubscribeError}</p>}
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={handlePublish}>Publish</button>
      <p>Received Message: {message}</p>
      <p>MQTT Connection Status: {status}</p>
    </div>
  );
};

export default Example;
```
