import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("job_seeker", (table) => {
    table.increments("id").unique().primary();
    table.string("first_name");
    table.string("last_name");
    table.string("email_address");
    table.string("contact_number");
    table.string("profile_pic");
    table.string("cv");
    table.string("address");
    table.enum("gender", ["male", "female", "other"]);
    table.string("password");
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("job_seeker");
}
