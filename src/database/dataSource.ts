import { DataSource } from "typeorm";
import { Country } from "../entity/Country";

const dataSource = new DataSource({
  type: "sqlite",
  database: "database.sqlite",
  entities: [Country],
  synchronize: true,
  logging: true,
});

export default dataSource;
