import { relations, sql } from 'drizzle-orm';
import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

export const userTable = sqliteTable('user', {
  id: text('id').notNull().primaryKey(),
  username: text('username').notNull().unique(),
  password: text('password').notNull(),
  role: integer('role').default(1).notNull(), // 1: user, 2: admin
  status: integer('status').default(1).notNull(), // 1: inactive, 2: active
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

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
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

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
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const subjectTable = sqliteTable('subject', {
  id: text('id').notNull().primaryKey(),
  subjectName: text('subject_name').notNull(),
  phase: integer('phase').notNull(),
  minimum: integer('minimum').notNull(),
  medium: integer('medium').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const cpTable = sqliteTable('capainPembelajaran', {
  id: text('id').notNull().primaryKey(),
  subjectId: text('subject_id')
    .notNull()
    .references(() => subjectTable.id, { onDelete: 'set null' }),
  capaianPembelajaran: text('capaian_pembelajaran').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const tpTable = sqliteTable('tujuanPembelajaran', {
  id: text('id').notNull().primaryKey(),
  cpId: text('cp_id')
    .references(() => cpTable.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  tujuanPembelajaran: text('tujuan_pembelajaran').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const nilaiTable = sqliteTable('nilai', {
  id: text('id').notNull().primaryKey(),
  tpId: text('tp_id')
    .notNull()
    .references(() => tpTable.id, { onDelete: 'cascade' }),
  studentId: text('student_id')
    .notNull()
    .references(() => studentTable.id, { onDelete: 'cascade' }),
  nilai: integer('nilai').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const modulTable = sqliteTable('modul', {
  id: text('id').notNull().primaryKey(),
  tpId: text('tp_id')
    .references(() => tpTable.id, { onDelete: 'cascade' })
    .notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  modul: text('modul').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const imagesTable = sqliteTable('images', {
  id: text('id').notNull().primaryKey(),
  userId: text('user_id').references(() => userTable.id, { onDelete: 'set null' }),
  studentId: text('student_id').references(() => studentTable.id, { onDelete: 'set null' }),
  link: text('link').notNull(),
  name: text('name').notNull(),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

export const soalTable = sqliteTable('soal', {
  id: text('id').notNull().primaryKey(),
  title: text('title').notNull(),
  soal: text('link').notNull(),
  answer: text('answer').notNull(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id, { onDelete: 'cascade' }),
  tpId: text('tp_id')
    .notNull()
    .references(() => tpTable.id, { onDelete: 'cascade' }),
  createdAt: text('created_at').default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text('updated_at')
    .default(sql`(CURRENT_TIMESTAMP)`)
    .$onUpdate(() => sql`(CURRENT_TIMESTAMP)`)
});

// Relations
export const usersRelations = relations(userTable, ({ many }) => ({
  class: many(classTable),
  tp: many(tpTable),
  modul: many(modulTable),
  soal: many(soalTable),
  images: many(imagesTable)
}));

export const classRelations = relations(classTable, ({ one, many }) => ({
  students: many(studentTable),
  teacher: one(userTable, {
    fields: [classTable.userId],
    references: [userTable.id]
  })
}));

export const studentRelations = relations(studentTable, ({ one, many }) => ({
  class: one(classTable, {
    fields: [studentTable.classId],
    references: [classTable.id]
  }),
  nilai: many(nilaiTable),
  images: many(imagesTable)
}));

export const pelajaranRelations = relations(subjectTable, ({ many }) => ({
  capaianPembelajaran: many(cpTable)
}));

export const cpRelations = relations(cpTable, ({ one, many }) => ({
  subject: one(subjectTable, {
    fields: [cpTable.subjectId],
    references: [subjectTable.id]
  }),
  tp: many(tpTable)
}));

export const tpRelations = relations(tpTable, ({ one, many }) => ({
  cp: one(cpTable, {
    fields: [tpTable.cpId],
    references: [cpTable.id]
  }),
  teacher: one(userTable, {
    fields: [tpTable.userId],
    references: [userTable.id]
  }),
  modul: many(modulTable),
  nilai: one(nilaiTable, {
    fields: [tpTable.id],
    references: [nilaiTable.tpId]
  }),
  soal: one(soalTable, {
    fields: [tpTable.id],
    references: [soalTable.tpId]
  })
}));

export const nilaiRelations = relations(nilaiTable, ({ one }) => ({
  tp: one(tpTable, {
    fields: [nilaiTable.tpId],
    references: [tpTable.id]
  }),
  student: one(studentTable, {
    fields: [nilaiTable.studentId],
    references: [studentTable.id]
  })
}));

export const modulRelations = relations(modulTable, ({ one }) => ({
  tp: one(tpTable, {
    fields: [modulTable.tpId],
    references: [tpTable.id]
  }),
  teacher: one(userTable, {
    fields: [modulTable.userId],
    references: [userTable.id]
  })
}));

export const soalRelations = relations(soalTable, ({ one }) => ({
  tp: one(tpTable, {
    fields: [soalTable.tpId],
    references: [tpTable.id]
  }),
  teacher: one(userTable, {
    fields: [soalTable.userId],
    references: [userTable.id]
  })
}));

export const imageRelations = relations(imagesTable, ({ one }) => ({
  student: one(studentTable, {
    fields: [imagesTable.studentId],
    references: [studentTable.id]
  }),
  teacher: one(userTable, {
    fields: [imagesTable.userId],
    references: [userTable.id]
  })
}));

// Type exports

export type selectUser = typeof userTable.$inferSelect;

export type selectClass = typeof classTable.$inferSelect;

export type selectStudent = typeof studentTable.$inferSelect;

export type selectSubject = typeof subjectTable.$inferSelect;

export type selectCp = typeof cpTable.$inferSelect;

export type selectTP = typeof tpTable.$inferSelect;

export type selectmodul = typeof modulTable.$inferSelect;

export type selectSoal = typeof soalTable.$inferSelect;
