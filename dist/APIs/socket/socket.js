"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = void 0;
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const environment_1 = __importDefault(require("../../environment"));
const services_1 = require("./services");
const socketIO = (app) => {
    const server = (0, http_1.createServer)(app);
    const topic_server = environment_1.default.SOCKET_TOPIC_SERVER || "server-topic-socket-monpity";
    const topic_client = environment_1.default.SOCKET_TOPIC_CLIENT || "client-topic-socket-monpity";
    const ioOption = {
        cors: {
            origin: environment_1.default.DOMAIN_SOCKET_FONT_END,
            methods: ["GET"],
            allowedHeaders: ["Access-Control-Allow-Origin"],
            credentials: true
        }
    };
    const io = new socket_io_1.Server(server, ioOption);
    io.on('connection', (client) => {
        console.log('user connected: ', client.id);
        client.on(topic_client, (data) => __awaiter(void 0, void 0, void 0, function* () {
            console.log("===================== socket ===========================");
            console.log(data);
            console.log("===================== socket ==========================");
            if ((data.module === 'member') ||
                (data.module === "editor" && data.event === "approved") ||
                (data.module === "admin" && data.event === "approved")) {
                io.emit(topic_server, data);
            }
            if (data.module === 'editor' && data.event === 'reserve') {
                yield (0, services_1.editorReserve)(data.payload);
                io.emit(topic_server, data);
            }
            if (data.module === 'editor' && data.event === 'cancel_reserve') {
                yield (0, services_1.editorCancelReserve)(data.payload);
                io.emit(topic_server, data);
            }
            if (data.module === 'admin' && data.event === 'reserve') {
                yield (0, services_1.adminReserve)(data.payload);
                io.emit(topic_server, data);
            }
            if (data.module === 'admin' && data.event === 'cancel_reserve') {
                yield (0, services_1.adminCancelReserve)(data.payload);
                io.emit(topic_server, data);
            }
        }));
    });
    return server;
};
exports.socketIO = socketIO;
//# sourceMappingURL=socket.js.map