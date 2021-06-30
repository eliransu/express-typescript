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
function updateAboutPrint(from, phoneNumber, text) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log({ from, text });
        const res = yield axios_1.default
            .post("https://waba.360dialog.io/v1/messages", {
            // recipient_type: "individual",
            to: "972503673666",
            type: "text",
            text: {
                body: `הודעה חדשה מאת ${from}, ${phoneNumber} ::: ${text}`,
            },
        }, { headers: { "D360-API-KEY": "HIDDEN" } })
            .catch((err) => console.log(err.response))
            .then((res) => console.log(res));
    });
}
const router = express_1.Router();
router.get("/", Home_1.default.index);
router.post("/auth/login", Login_1.default.perform);
router.post("/auth/register", Register_1.default.perform);
router.post("/auth/refresh-token", expressJwt({ secret: Locals_1.default.config().appSecret }), RefreshToken_1.default.perform);
router.post("/wow", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    console.log("here!", (_c = (_b = (_a = req.body) === null || _a === void 0 ? void 0 : _a.statuses) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.errors);
    if (req.body.messages) {
        const { profile = {}, wa_id: phoneNumber = "" } = ((_e = (_d = req === null || req === void 0 ? void 0 : req.body) === null || _d === void 0 ? void 0 : _d.contacts) === null || _e === void 0 ? void 0 : _e[0]) || {};
        const message = (_j = (_h = (_g = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.messages) === null || _g === void 0 ? void 0 : _g[0]) === null || _h === void 0 ? void 0 : _h.text) === null || _j === void 0 ? void 0 : _j.body;
        updateAboutPrint(profile.name, phoneNumber, message);
        return res.status(200).end();
    }
    else {
    }
}));
router.get("/eliran", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield axios_1.default
        .post("https://waba.360dialog.io/v1/contacts", {
        blocking: "wait",
        contacts: ["+972503673664"],
        force_check: true,
    }, { headers: { "D360-API-KEY": "HIDDEN" } })
        .then((res) => res.data)
        .catch((err) => console.log(err.response.data.meta));
    console.log(contacts);
    // const res = await axios
    //   .post(
    //     "https://waba.360dialog.io/v1/messages",
    //     {
    //       // recipient_type: "individual",
    //       to: "972525244304",
    //       type: "text",
    //       text: {
    //         body: "היי, איך נוכל לעזור?",
    //       },
    //     },
    //     { headers: { "D360-API-KEY": "HIDDEN" } }
    //   )
    //   .catch((err) => console.log(err.response));
    // const res = await axios
    //   .post(
    //     "https://waba.360dialog.io/v1/configs/webhook",
    //     { url: "https://831581147ae6.ngrok.io/api/wow" },
    //     {
    //       headers: { "D360-API-KEY": "HIDDEN" },
    //     }
    //   )
    //   .catch((err) => console.log(err.response.data));
    // console.log({ res: (res as any).data });
}));
exports.default = router;
//# sourceMappingURL=Api.js.map