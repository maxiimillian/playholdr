import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE TABLE users (
        id serial PRIMARY KEY,
        name VARCHAR(50) UNIQUE NOT NULL,
        password VARCHAR(120) NOT NULL,
        email VARCHAR(255) UNIQUE,
        date_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE tokens (
        user_id int4 NOT NULL UNIQUE, 
        token varchar(500) NOT NULL,
        CONSTRAINT fk_user FOREIGN KEY(user_id) REFERENCES users(id)
    );

    CREATE TABLE posts (
        id serial NOT NULL PRIMARY KEY,
        title varchar(40) NOT NULL,
        date_created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        content varchar(10000) NOT NULL,
        author_id int4 NOT NULL,
        CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES users(id)
    );

    CREATE TABLE ref_post_tag_types (
        id serial NOT NULL PRIMARY KEY,
        name varchar NOT NULL
    );

    CREATE TABLE post_tags (
        post_id int4 NOT NULL,
        type_id int4 NOT NULL,
        CONSTRAINT fk_post FOREIGN KEY(post_id) REFERENCES posts(id),
        CONSTRAINT fk_type FOREIGN KEY(type_id) REFERENCES ref_post_tag_types(id)
    );

    CREATE TABLE comments (
        id serial NOT NULL PRIMARY KEY,
        author_id int4 NOT NULL,
        content varchar(2000) NOT NULL,
        date_created timestamptz NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_author FOREIGN KEY(author_id) REFERENCES users(id)
    );

    CREATE TABLE boards (
        id serial PRIMARY KEY,
        unsolved TEXT UNIQUE,
        solved TEXT,
        difficulty TEXT
    );
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
        DROP TABLE tokens;
        DROP TABLE boards;
        DROP TABLE comments;
        DROP TABLE post_tags;
        DROP TABLE ref_post_tag_types;
        DROP TABLE posts;
        DROP TABLE users;
    `);
}
