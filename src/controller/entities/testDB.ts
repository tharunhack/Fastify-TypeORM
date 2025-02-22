import { Entity, PrimaryGeneratedColumn } from "typeorm";
import { TEST_DB } from "../../constants";

@Entity(TEST_DB)
export class TestDB {
  @PrimaryGeneratedColumn()
  id!: number;
}
