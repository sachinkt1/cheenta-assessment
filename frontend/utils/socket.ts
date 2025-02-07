import { io } from "socket.io-client";

const socket = io("http://localhost:5003"); // Replace with your notification-service URL
export default socket;
