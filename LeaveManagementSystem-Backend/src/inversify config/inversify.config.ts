import { Container } from "inversify";
import { leaveService, userService } from "../services";
import { checkUserMiddleware } from "../middleware";

const container = new Container();

container.bind<userService>(userService).toSelf();
container.bind<checkUserMiddleware>(checkUserMiddleware).toSelf();
container.bind<leaveService>(leaveService).toSelf()

export default container;