import { create } from 'zustand';
import { io } from 'socket.io-client';

const useSocketStore = create((set, get) => ({
  socket: null,
  serverTimeOffset: 0,
  connect: () => {
    if (!get().socket) {
      const newSocket = io('http://localhost:5000');
      
      newSocket.on('serverTime', ({ timestamp }) => {
        const offset = timestamp - Date.now();
        set({ serverTimeOffset: offset });
      });

      set({ socket: newSocket });
    }
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));

export default useSocketStore;
