"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("./../../utils/jwt");
const express_1 = require("express");
const file_upload_1 = require("../../utils/file-upload");
const router = (0, express_1.Router)();
router.get('/book-types', controllers_1.getBookTypeController);
router.post('/book-types/create', jwt_1.verify, (0, file_upload_1.uploadFile)().single('file'), validate_1.validateSchema, validate_1.validateResults, controllers_1.createBookTypeController);
router.post('/book-types/update', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createBookTypeController);
router.delete('/book-types/delete/:id', jwt_1.verify, controllers_1.removeBookTypeController);
exports.default = router;
//# sourceMappingURL=index.js.map