import { mysqlTable, serial, varchar, timestamp, int, decimal, text, mysqlEnum, json, date } from "drizzle-orm/mysql-core";
import { index, uniqueIndex } from "drizzle-orm/mysql-core";

/* ================= USERS ================= */
export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 191 }).notNull(),
  email: varchar("email", { length: 191 }).notNull(),
  passwordHash: varchar("password_hash", { length: 255 }),
  provider: mysqlEnum("provider", ["LOCAL","GOOGLE"]).default("LOCAL").notNull(),
  role: varchar("role", { length: 64 }).default("AGENT").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  emailUq: uniqueIndex("users_email_uq").on(t.email),
  providerIdx: index("users_provider_idx").on(t.provider),
}));

/* ================= IMOVEIS ================= */
export const imoveis = mysqlTable("imoveis", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 191 }).notNull(),
  titulo: varchar("titulo", { length: 191 }).notNull(),
  descricao: text("descricao"),
  status: mysqlEnum("status", ["DRAFT","PUBLISHED","ARCHIVED"]).default("DRAFT").notNull(),
  tipo: varchar("tipo", { length: 120 }).default("residencial").notNull(),
  cidade: varchar("cidade", { length: 120 }).notNull(),
  estado: varchar("estado", { length: 5 }).notNull(),
  bairro: varchar("bairro", { length: 120 }),
  preco: decimal("preco", { precision: 15, scale: 2 }).default("0.00").notNull(),
  area: decimal("area", { precision: 10, scale: 2 }),
  quartos: int("quartos"),
  banheiros: int("banheiros"),
  vagas: int("vagas"),
  destaque: int("destaque").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow().notNull(),
}, (t) => ({
  idxStatus: index("imoveis_status_idx").on(t.status),
  idxTipo: index("imoveis_tipo_idx").on(t.tipo),
  idxBairro: index("imoveis_bairro_idx").on(t.bairro),
  idxPreco: index("imoveis_preco_idx").on(t.preco),
  idxCreated: index("imoveis_created_idx").on(t.createdAt),
}));

/* ================= IMAGENS ================= */
export const imagens = mysqlTable("imagens", {
  id: serial("id").primaryKey(),
  imovelId: int("imovel_id").notNull().references(()=>imoveis.id),
  url: varchar("url", { length: 255 }).notNull(),
  ordem: int("ordem").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ================= CONTRATOS ================= */
export const contratos = mysqlTable("contratos", {
  id: serial("id").primaryKey(),
  tipo: varchar("tipo", { length: 60 }).notNull(),
  imovelId: int("imovel_id").references(()=>imoveis.id),
  clienteId: int("cliente_id"),
  corretorId: int("corretor_id").references(()=>users.id),
  valor: decimal("valor", { precision: 12, scale: 2 }),
  comissao: decimal("comissao", { precision: 5, scale: 2 }),
  prazo: date("prazo"),
  observacoes: text("observacoes"),
  arquivoUrl: varchar("arquivo_url", { length: 255 }),
  criadoEm: timestamp("criado_em").defaultNow(),
});

/* ================= CAMPANHAS ================= */
export const campanhas = mysqlTable("campanhas", {
  id: serial("id").primaryKey(),
  plataforma: mysqlEnum("plataforma", ["meta","google"]).notNull(),
  imovelId: int("imovel_id").references(()=>imoveis.id).notNull(),
  objetivo: mysqlEnum("objetivo", ["engajamento","leads","trafego"]).default("leads").notNull(),
  status: mysqlEnum("status", ["rascunho","aprovacao","publicado","pausado","erro"]).default("rascunho").notNull(),
  nome: varchar("nome", { length: 120 }),
  dailyBudget: decimal("daily_budget", { precision: 10, scale: 2 }).default("20.00"),
  targetingJson: json("targeting_json"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow().onUpdateNow(),
});

export const campanhaAssets = mysqlTable("campanha_assets", {
  id: serial("id").primaryKey(),
  campanhaId: int("campanha_id").references(()=>campanhas.id).notNull(),
  titulo: varchar("titulo", { length: 90 }),
  descricao: varchar("descricao", { length: 300 }),
  urlImagem: varchar("url_imagem", { length: 255 }),
  urlDestino: varchar("url_destino", { length: 255 }),
});

export const campanhaJobs = mysqlTable("campanha_jobs", {
  id: serial("id").primaryKey(),
  campanhaId: int("campanha_id").references(()=>campanhas.id).notNull(),
  tipo: mysqlEnum("tipo", ["preview","publicar","pausar"]).notNull(),
  status: mysqlEnum("status", ["pendente","ok","falha"]).default("pendente").notNull(),
  detalhe: text("detalhe"),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ================= MÉTRICAS ================= */
export const metrics = mysqlTable("metrics", {
  id: serial("id").primaryKey(),
  campanhaId: int("campanha_id").references(()=>campanhas.id),
  fonte: mysqlEnum("fonte", ["meta","google","site"]).notNull(),
  metrica: varchar("metrica", { length: 48 }).notNull(),
  valor: decimal("valor", { precision: 14, scale: 4 }).notNull(),
  periodo: date("periodo").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/* ================= AGENTE ================= */
export const agentJobs = mysqlTable("agent_jobs", {
  id: serial("id").primaryKey(),
  tipo: varchar("tipo", { length: 64 }).notNull(),
  payload: json("payload").notNull(),
  status: mysqlEnum("status", ["pendente","executando","ok","erro"]).default("pendente"),
  resultado: text("resultado"),
  criadoEm: timestamp("criado_em").defaultNow(),
});
