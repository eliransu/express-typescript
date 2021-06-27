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

const router = Router();

router.get("/", HomeController.index);

router.post("/auth/login", LoginController.perform);
router.post("/auth/register", RegisterController.perform);
router.post(
  "/auth/refresh-token",
  expressJwt({ secret: Locals.config().appSecret }),
  RefreshTokenController.perform
);
router.get("/eliran", async (req, res) => {
  // const contacts = await axios
  //   .post(
  //     "https://waba.360dialog.io/v1/contacts",
  //     {
  //       blocking: "wait",
  //       contacts: ["+972503673666"],
  //       force_check: true,
  //     },
  //     { headers: { "D360-API-KEY": "YOUR_API_KEY" } }
  //   )
  //   .then((res) => res.data)
  //   .catch((err) => console.log(err.response.data.meta));
  const res = await axios
    .post(
      "https://waba.360dialog.io/v1/messages",
      {
        // recipient_type: "individual",
        to: "972525244304",
        type: "text",
        text: {
          body: "היי, איך נוכל לעזור?",
        },
      },
      { headers: { "D360-API-KEY": "YOUR_API_KEY" } }
    )
    .catch((err) => console.log(err.response));
});
export default router;
