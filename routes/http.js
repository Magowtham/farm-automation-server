const routes = require("express").Router();

routes.post("/create_farm", require("../controllers/http/create_farm"));
routes.post("/create_device", require("../controllers/http/create_device"));
routes.post("/create_node", require("../controllers/http/create_node"));
routes.post("/create_account", require("../controllers/http/create_account"));
routes.post("/login", require("../controllers/http/user_login"));

routes.get("/verify_token", require("../controllers/http/verify_token"));
routes.get("/farms", require("../controllers/http/get_farms"));
routes.get("/devices", require("../controllers/http/get_devices"));
routes.get("/nodes", require("../controllers/http/get_nodes"));
routes.get("/device_data", require("../controllers/http/get_device_data"));
routes.get(
  "/account/verify_email/:id/:token",
  require("../controllers/http/verify_email")
);
routes.get(
  "/account/aprove/:id",
  require("../controllers/http/aprove_account")
);
routes.get(
  "/account/reject/:id",
  require("../controllers/http/reject_account")
);
routes.get(
  "/account/send__email_verify_email/:user_id",
  require("../controllers/http/send_email_verify_email")
);
routes.get(
  "/notifications/:user_id",
  require("../controllers/http/get_notifications")
);
routes.get(
  "/delete_notification/:notification_id",
  require("../controllers/http/delete_notification")
);
routes.get("/user_logout", require("../controllers/http/user_logout"));

module.exports = routes;
