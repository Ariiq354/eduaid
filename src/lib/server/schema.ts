import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: integer('role').default(1).notNull(), // 1: user, 2: admin
  status: integer('status').default(1).notNull(), // 1: inactive, 2: active
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const usersRelations = relations(userTable, ({ many }) => ({
  class: many(classTable)
}));

export type selectUser = typeof userTable.$inferSelect;

export const sessionTable = sqliteTable('session', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at').notNull()
});

export const classTable = sqliteTable('class', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').references(() => userTable.id, {
    onDelete: 'set null'
  }),
  classname: text('classname').notNull(),
  batch: integer('batch').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const classRelations = relations(classTable, ({ one, many }) => ({
  students: many(studentTable),
  teacher: one(userTable, {
    fields: [classTable.userId],
    references: [userTable.id]
  })
}));

export type selectClass = typeof classTable.$inferSelect;

export const studentTable = sqliteTable('student', {
  id: text('id').notNull().primaryKey(),
  classId: text('class_id').references(() => classTable.id, { onDelete: 'set null' }),
  noInduk: text('no_induk').notNull().unique(),
  studentName: text('student_name').notNull(),
  nisn: text('nisn').notNull().unique(),
  namaPanggilan: text('nama_panggilan').notNull(),
  gender: integer('gender').notNull(), // 1: laki, 2: perempuan
  agama: text('agama').notNull(),
  tempatLahir: text('tempatLahir').notNull(),
  tanggalLahir: text('tanggal_lahir').notNull(),
  pendidikan: text('pendidikan').notNull(),
  alamat: text('alamat').notNull(),
  namaAyah: text('nama_ayah').notNull(),
  namaIbu: text('nama_ibu').notNull(),
  pekerjaanAyah: text('pekerjaan_ayah').notNull(),
  pekerjaanIbu: text('pekerjaan_ibu').notNull(),
  provinsi: text('provinsi').notNull(),
  kota: text('kota').notNull(),
  kecamatan: text('kecamatan').notNull(),
  kelurahan: text('kelurahan').notNull(),
  jalan: text('jalan').notNull(),
  noTelepon: text('no_telepon').notNull(),
  namaWali: text('nama_wali').notNull(),
  pekerjaanWali: text('pekerjaan_wali').notNull(),
  alamatWali: text('alamat_wali').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const studentRelations = relations(studentTable, ({ one }) => ({
  class: one(classTable, {
    fields: [studentTable.classId],
    references: [classTable.id]
  })
}));

export type selectStudent = typeof studentTable.$inferSelect;

export const subjectTable = sqliteTable('subject', {
  id: text('id').notNull().primaryKey(),
  subjectName: text('subject_name').notNull(),
  batch: integer('batch').notNull(),
  minimum: integer('minimum').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export type selectSubject = typeof subjectTable.$inferSelect;

export const pelajaranRelations = relations(subjectTable, ({ many }) => ({
  capaianPembelajaran: many(cpTable)
}));

export const cpTable = sqliteTable('capainPembelajaran', {
  id: text('id').notNull().primaryKey(),
  subjectId: text('subject_id').references(() => subjectTable.id, { onDelete: 'set null' }),
  capaianPembelajaran: text('capaian_pembelajaran').notNull(),
  createdAt: text('created_at').default(sql`CURRENT_TIMESTAMP`)
});

export const cpRelations = relations(cpTable, ({ one }) => ({
  class: one(subjectTable, {
    fields: [cpTable.subjectId],
    references: [subjectTable.id]
  })
}));
