"use strict";
/**
 * Define all your API web-routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const expressJwt = require("express-jwt");
const Locals_1 = require("../providers/Locals");
const Home_1 = require("../controllers/Api/Home");
const Login_1 = require("../controllers/Api/Auth/Login");
const Register_1 = require("../controllers/Api/Auth/Register");
const RefreshToken_1 = require("../controllers/Api/Auth/RefreshToken");
const axios_1 = require("axios");
const router = express_1.Router();
router.get("/", Home_1.default.index);
router.post("/auth/login", Login_1.default.perform);
router.post("/auth/register", Register_1.default.perform);
router.post("/auth/refresh-token", expressJwt({ secret: Locals_1.default.config().appSecret }), RefreshToken_1.default.perform);
router.get("/eliran", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const contacts = await axios
    //   .post(
    //     "https://waba.360dialog.io/v1/contacts",
    //     {
    //       blocking: "wait",
    //       contacts: ["+972503673666"],
    //       force_check: true,
    //     },
    //     { headers: { "D360-API-KEY": "NtxtvRXkVlD4gFrjFreb0Sv3AK" } }
    //   )
    //   .then((res) => res.data)
    //   .catch((err) => console.log(err.response.data.meta));
    const res = yield axios_1.default
        .post("https://waba.360dialog.io/v1/messages", {
        // recipient_type: "individual",
        to: "972525244304",
        type: "text",
        text: {
            body: "היי, איך נוכל לעזור?",
        },
    }, { headers: { "D360-API-KEY": "NtxtvRXkVlD4gFrjFreb0Sv3AK" } })
        .catch((err) => console.log(err.response));
}));
exports.default = router;
//# sourceMappingURL=Api.js.map