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
exports.getStatsController = void 0;
const http_status_codes_1 = require("http-status-codes");
const prisma_1 = __importDefault(require("../../prisma"));
require("../../utils/extensions");
const getStatsController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield prisma_1.default.$queryRaw `
            SELECT
            (SELECT COUNT(b_id) FROM tbl_books tb WHERE editor_approved_by IS NOT NULL AND admin_approved_by IS NULL) AS admin_new_books,
            (SELECT COUNT(b_id) FROM tbl_books) AS books,
            (SELECT COUNT(u_id) FROM tbl_users WHERE role='Member') AS users
        `;
        if (result.length <= 0)
            return res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json([]);
        return res.json(result[0]);
    }
    catch (error) {
        console.error(error);
        return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
});
exports.getStatsController = getStatsController;
//# sourceMappingURL=controllers.js.map