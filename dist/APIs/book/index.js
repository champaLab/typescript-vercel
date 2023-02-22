"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controllers_1 = require("./controllers");
const validate_1 = require("./validate");
const jwt_1 = require("./../../utils/jwt");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.post('/books/search', validate_1.validateSearchSchema, validate_1.validateResults, controllers_1.getBookSearchController);
router.get('/get-books-by-type/:id', controllers_1.getBookByBookTypeController);
router.get('/new-books', jwt_1.verify, controllers_1.editorGetNewBookController);
router.get('/admin-new-books', jwt_1.verify, controllers_1.adminGetNewBookController);
router.post('/admin-approve-books', jwt_1.verify, controllers_1.adminApproveBookController);
router.post('/editor-approve-books', jwt_1.verify, controllers_1.editorApproveBookController);
router.get('/my-books', jwt_1.verify, controllers_1.getMyBookController);
router.post('/books/create/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.createBookController);
router.post('/books/update/', jwt_1.verify, validate_1.validateSchema, validate_1.validateResults, controllers_1.updateBookController);
router.delete('/books/delete/:id', jwt_1.verify, controllers_1.removeBookController);
exports.default = router;
//# sourceMappingURL=index.js.map