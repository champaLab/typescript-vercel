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
exports.lineNotify = void 0;
const axios_1 = __importDefault(require("./axios"));
const lineNotify = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield axios_1.default.post('/', { message });
        console.log("=============== call line success =================");
        console.log(res.data);
        console.log(res.status);
    }
    catch (error) {
        console.log("=================================================", error);
    }
});
exports.lineNotify = lineNotify;
//# sourceMappingURL=line-notice.js.map