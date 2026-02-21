import { DataSource } from "typeorm";
import { User } from "../models/entities/user.entity";
import { Role } from "../models/entities/role.entity";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Role],
    migrations: [],
    subscribers: [],
});