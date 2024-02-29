import { sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { generateId } from 'lucia';

export const userTable = sqliteTable('user', {
	id: text('id').notNull().primaryKey(),
	username: text('username'),
	password: text('password'),
	role: integer('role'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = sqliteTable('session', {
	id: text('id').notNull().primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => userTable.id, { onDelete: 'cascade' }),
	expiresAt: integer('expires_at').notNull()
});

export const classTable = sqliteTable('class', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	userId: text('user_id').references(() => userTable.id, {
		onDelete: 'set null'
	}),
	classname: text('classname'),
	batch: integer('batch'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const studentTable = sqliteTable('student', {
	id: text('id')
		.notNull()
		.primaryKey()
		.$defaultFn(() => generateId(15)),
	classId: text('class_id').references(() => classTable.id, { onDelete: 'set null' }),
	studentName: text('student_name'),
	email: text('email'),
	createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});
