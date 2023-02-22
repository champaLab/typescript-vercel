import { createServer } from "http";
import { Server } from "socket.io";
import environment from "../../environment";
import { editorReserve, editorCancelReserve, adminReserve, adminCancelReserve } from "./services";
import { TSocket } from "./types";




export const socketIO = (app: any) => {
    const server = createServer(app);
    const topic_server = environment.SOCKET_TOPIC_SERVER || "server-topic-socket-monpity"
    const topic_client = environment.SOCKET_TOPIC_CLIENT || "client-topic-socket-monpity"

    const ioOption = {
        cors: {
            origin: environment.DOMAIN_SOCKET_FONT_END,
            methods: ["GET"],
            allowedHeaders: ["Access-Control-Allow-Origin"],
            credentials: true
        }
    }

    const io = new Server(server, ioOption)

    io.on('connection', (client) => {
        console.log('user connected: ', client.id)

        client.on(topic_client, async (data: TSocket) => {
            console.log("===================== socket ===========================")
            console.log(data)
            console.log("===================== socket ==========================")

            if (
                (data.module === 'member') ||
                (data.module === "editor" && data.event === "approved") ||
                (data.module === "admin" && data.event === "approved")
            ) { io.emit(topic_server, data) }

            if (data.module === 'editor' && data.event === 'reserve') {
                await editorReserve(data.payload)
                io.emit(topic_server, data)
            }

            if (data.module === 'editor' && data.event === 'cancel_reserve') {
                await editorCancelReserve(data.payload)
                io.emit(topic_server, data)
            }

            if (data.module === 'admin' && data.event === 'reserve') {
                await adminReserve(data.payload)
                io.emit(topic_server, data)
            }

            if (data.module === 'admin' && data.event === 'cancel_reserve') {
                await adminCancelReserve(data.payload)
                io.emit(topic_server, data)
            }
        });
    });
    return server;
}