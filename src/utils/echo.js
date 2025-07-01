import Echo from 'laravel-echo';
// import { io } from 'socket.io-client';
import io, {Socket} from 'socket.io-client';

let echo = null;

export const connectSocket = ({
  myProfileId,
  token,
  setMessages,
  setIsConnected,
  setSocketStatus,
}) => {
  console.log('🟡 connectSocket called',   myProfileId,
  );

  if (!myProfileId || !token) {
    console.warn('🔴 Missing profileId or token. Cannot connect to socket.');
    return;
  }

  if (echo) {
    echo.leave(`chat.candidate.${myProfileId}`);
    // echo.leave(`chat.recruiter.${myProfileId}`);
    echo.disconnect();
    echo = null;
  }

  try {
    console.log('🔌 Creating Echo instance...');
    setSocketStatus('connecting');

    window.io = io; // Needed for Laravel Echo to work
    echo = new Echo({
      broadcaster: 'socket.io',
      host: 'https://fillin-admin.cyberxinfosolution.com:6001',
      authEndpoint: 'https://fillin-admin.cyberxinfosolution.com/api/broadcasting/auth',
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
      transports: ['websocket'],
      forceTLS: true,
      encrypted: true,
      disableStats: true,
    });

    echo.connector.socket.on('connect', () => {
      console.log('✅ Socket connected');
      setIsConnected(true);
      setSocketStatus('connected');
    });

    echo.connector.socket.on('disconnect', () => {
      console.log('🔴 Socket disconnected');
      setIsConnected(false);
      setSocketStatus('disconnected');
    });

    echo.connector.socket.on('connect_error', (err) => {
      console.log('❌ Socket connection error:', err);
      setIsConnected(false);
      setSocketStatus('disconnected');
    });

    const channelName = `chat.candidate.${myProfileId}`;
    // const channelName = `chat.recruiter.${myProfileId}`;
    const eventName = '.message.sent';

    echo
      .private(channelName)
      .subscribed(() => {
        console.log(`📡 Subscribed to ${channelName}`);

      })
      .listen(eventName, (data) => {
        console.log('📩 Message received via Echo:', data);
        const receivedMessage = {
          id: data.id?.toString() || Date.now().toString(),
          senderId: data.sender_id,
          content: data.message,
          timestamp: data.created_at || new Date().toISOString(),
          isMe: data.sender_id === myProfileId,
        };
        setMessages((prev) => [...prev, receivedMessage]);
      })
      .error((err) => {
        console.error('❌ Echo subscription error:', err);
      });

  } catch (error) {
    console.error('❌ Error initializing Echo:', error);
    setSocketStatus('disconnected');
  }
};

export const disconnectSocket = () => {
  if (echo) {
    echo.disconnect();
    echo = null;
    console.log('🔌 Echo disconnected');
  }
};
