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
exports.verify = exports.sign = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const environment_1 = __importDefault(require("../environment"));
const i = 'Monpity'; // Issuer (Software organization who issues the token)
const s = 'monpity@gmail.com'; // Subject (intended user of the token)
const a = 'https://monpity.la'; // Audience (Domain within which this token will live and function)
const sign = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const privateKEY = (_a = environment_1.default.PRIVATE_KEY) !== null && _a !== void 0 ? _a : '';
    // Token signing options
    const signOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "24h",
        algorithm: "RS256"
    };
    return jsonwebtoken_1.default.sign(payload, privateKEY, signOptions);
});
exports.sign = sign;
const verify = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    let token = req.headers['Authorization'];
    if (req.headers.authorization) {
        token = `${req.headers.authorization}`.replace('Bearer ', '');
    }
    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    const verifyOptions = {
        issuer: i,
        subject: s,
        audience: a,
        expiresIn: "24h",
        algorithm: ["RS256"]
    };
    const publicKEY = (_b = environment_1.default.PUBLIC_KEY) !== null && _b !== void 0 ? _b : '';
    ;
    jsonwebtoken_1.default.verify(token, publicKEY, verifyOptions, function (err, decoded) {
        if (err) {
            console.error(err);
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        // if everything good, save to request for use in other routes
        if (decoded) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            req.body.user = decoded;
            console.log("verify token: ", decoded);
        }
        next();
    });
});
exports.verify = verify;
//# sourceMappingURL=jwt.js.map