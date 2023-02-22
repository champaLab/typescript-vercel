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
exports.getContactService = void 0;
const prisma_1 = __importDefault(require("../../prisma"));
const getContactService = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let content = yield prisma_1.default.$queryRaw ` SELECT * FROM tbl_contact order by id DESC limit 1 `;
        yield prisma_1.default.$disconnect();
        return content;
    }
    catch (e) {
        console.log(e);
        yield prisma_1.default.$disconnect();
        process.exit(1);
    }
});
exports.getContactService = getContactService;
//# sourceMappingURL=services.js.map