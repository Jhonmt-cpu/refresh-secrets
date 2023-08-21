import { Router } from "express";
import { Segments, celebrate } from "celebrate";
import Joi from "joi";
import { CreateUserController } from "../../modules/users/use-cases/create-user/create-user.controller";
import { AuthenticateUserController } from "../../modules/auth/use-cases/authenticate-user/authenticate-user.controller";
import { ensureAuthenticated } from "../../modules/auth/middlewares/ensure-authenticated";
import { GetUserController } from "../../modules/users/use-cases/get-user/get-user.controller";
import { RefreshTokenController } from "../../modules/auth/use-cases/refresh-token/refresh-token.controller";
import { SynchronizeCacheController } from "../../modules/auth/use-cases/synchronize-cache/synchronize-cache.controller";

const router = Router();

const createUserController = new CreateUserController();
const getUserController = new GetUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshAccessTokenController = new RefreshTokenController();
const synchronizeCacheController = new SynchronizeCacheController();

router.post(
  "/users",
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required().length(8),
    }
  }),
  createUserController.handle
);

router.get(
  "/users",
  ensureAuthenticated,
  getUserController.handle,
);

router.post(
  "/login",
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required().length(8),
    }
  }),
  authenticateUserController.handle,
);

router.post(
  "/refresh",
  celebrate({
    [Segments.BODY]: {
      refresh_token: Joi.string().uuid().required(),
    }
  }),
  refreshAccessTokenController.handle,
)

router.post(
  "/synchronize-cache",
  ensureAuthenticated,
  synchronizeCacheController.handle,
);

router.get("/", (request, response) => {
  return response.json({ message: "Hello World" });
});

export { router };
