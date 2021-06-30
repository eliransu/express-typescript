/**
 * Define all your API web-routes
 *
 * @author Faiz A. Farooqui <faiz@geekyants.com>
 */

import { Router } from "express";
import * as expressJwt from "express-jwt";

import Locals from "../providers/Locals";

import HomeController from "../controllers/Api/Home";
import LoginController from "../controllers/Api/Auth/Login";
import RegisterController from "../controllers/Api/Auth/Register";
import RefreshTokenController from "../controllers/Api/Auth/RefreshToken";
import axios from "axios";

async function updateAboutPrint(from, phoneNumber, text) {
  console.log({ from, text });
  const res = await axios
    .post(
      "https://waba.360dialog.io/v1/messages",
      {
        // recipient_type: "individual",
        to: "972503673666",
        type: "text",
        text: {
          body: `הודעה חדשה מאת ${from}, ${phoneNumber} ::: ${text}`,
        },
      },
      { headers: { "D360-API-KEY": "HIDDEN" } }
    )
    .catch((err) => console.log(err.response))
    .then((res) => console.log(res));
}
const router = Router();

router.get("/", HomeController.index);

router.post("/auth/login", LoginController.perform);
router.post("/auth/register", RegisterController.perform);
router.post(
  "/auth/refresh-token",
  expressJwt({ secret: Locals.config().appSecret }),
  RefreshTokenController.perform
);
router.post("/wow", async (req, res, next) => {
  console.log("here!", req.body?.statuses?.[0]?.errors);
  if (req.body.messages) {
    const { profile = {}, wa_id: phoneNumber = "" } =
      req?.body?.contacts?.[0] || {};
    const message = req?.body?.messages?.[0]?.text?.body;
    updateAboutPrint(profile.name, phoneNumber, message);
    return res.status(200).end();
  } else {
  }
});
router.get("/eliran", async (req, res) => {
  const contacts = await axios
    .post(
      "https://waba.360dialog.io/v1/contacts",
      {
        blocking: "wait",
        contacts: ["+972503673664"],
        force_check: true,
      },
      { headers: { "D360-API-KEY": "HIDDEN" } }
    )
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
});
export default router;
