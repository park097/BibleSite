import { fallbackGallery, fallbackNotices } from "@/lib/data";
import { getDbPool } from "@/lib/db";
import type {
  GalleryInput,
  GalleryItem,
  Notice,
  NoticeInput,
  Registration,
  RegistrationInput
} from "@/types";

let memoryRegistrations: Registration[] = [
  {
    id: 1,
    name: "홍길동",
    church: "샘물교회",
    email: "sample@example.com",
    phone: "010-0000-0000",
    createdAt: new Date().toISOString()
  }
];

let memoryNotices: Notice[] = [...fallbackNotices];
let memoryGallery: GalleryItem[] = [...fallbackGallery];

function toIso(value: Date | string) {
  return typeof value === "string" ? value : value.toISOString();
}

export async function createRegistration(input: RegistrationInput) {
  const pool = getDbPool();

  if (!pool) {
    const registration = {
      id: memoryRegistrations.length ? Math.max(...memoryRegistrations.map((item) => item.id)) + 1 : 1,
      ...input,
      createdAt: new Date().toISOString()
    } satisfies Registration;

    memoryRegistrations = [registration, ...memoryRegistrations];
    return registration;
  }

  const [result] = await pool.query(
    "INSERT INTO registrations (name, church, phone, email, created_at) VALUES (?, ?, ?, ?, NOW())",
    [input.name, input.church, input.phone, input.email]
  );

  return {
    id: Number((result as { insertId: number }).insertId),
    ...input,
    createdAt: new Date().toISOString()
  } satisfies Registration;
}

export async function listRegistrations() {
  const pool = getDbPool();

  if (!pool) {
    return [...memoryRegistrations];
  }

  const [rows] = await pool.query(
    "SELECT id, name, church, email, phone, created_at FROM registrations ORDER BY created_at DESC"
  );

  return (rows as Array<Record<string, string | number | Date>>).map((row) => ({
    id: Number(row.id),
    name: String(row.name),
    church: String(row.church),
    email: String(row.email),
    phone: String(row.phone),
    createdAt: toIso(row.created_at as Date | string)
  }));
}

export async function listNotices() {
  const pool = getDbPool();

  if (!pool) {
    return [...memoryNotices].sort((a, b) => b.id - a.id);
  }

  const [rows] = await pool.query("SELECT id, title, content, created_at FROM notices ORDER BY created_at DESC");

  return (rows as Array<Record<string, string | number | Date>>).map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    content: String(row.content),
    createdAt: toIso(row.created_at as Date | string)
  })) satisfies Notice[];
}

export async function getNoticeById(id: number) {
  const pool = getDbPool();

  if (!pool) {
    return memoryNotices.find((item) => item.id === id) ?? null;
  }

  const [rows] = await pool.query("SELECT id, title, content, created_at FROM notices WHERE id = ? LIMIT 1", [id]);
  const row = (rows as Array<Record<string, string | number | Date>>)[0];

  if (!row) {
    return null;
  }

  return {
    id: Number(row.id),
    title: String(row.title),
    content: String(row.content),
    createdAt: toIso(row.created_at as Date | string)
  } satisfies Notice;
}

export async function createNotice(input: NoticeInput) {
  const pool = getDbPool();

  if (!pool) {
    const notice = {
      id: memoryNotices.length ? Math.max(...memoryNotices.map((item) => item.id)) + 1 : 1,
      ...input,
      createdAt: new Date().toISOString()
    } satisfies Notice;
    memoryNotices = [notice, ...memoryNotices];
    return notice;
  }

  const [result] = await pool.query(
    "INSERT INTO notices (title, content, created_at) VALUES (?, ?, NOW())",
    [input.title, input.content]
  );

  return {
    id: Number((result as { insertId: number }).insertId),
    ...input,
    createdAt: new Date().toISOString()
  } satisfies Notice;
}

export async function updateNoticeById(id: number, input: NoticeInput) {
  const pool = getDbPool();

  if (!pool) {
    memoryNotices = memoryNotices.map((item) => (item.id === id ? { ...item, ...input } : item));
    return memoryNotices.find((item) => item.id === id) ?? null;
  }

  const [result] = await pool.query("UPDATE notices SET title = ?, content = ? WHERE id = ?", [
    input.title,
    input.content,
    id
  ]);

  if (!(result as { affectedRows: number }).affectedRows) {
    return null;
  }

  return getNoticeById(id);
}

export async function deleteNoticeById(id: number) {
  const pool = getDbPool();

  if (!pool) {
    const before = memoryNotices.length;
    memoryNotices = memoryNotices.filter((item) => item.id !== id);
    return before !== memoryNotices.length;
  }

  const [result] = await pool.query("DELETE FROM notices WHERE id = ?", [id]);
  return Boolean((result as { affectedRows: number }).affectedRows);
}

export async function listGalleryItems() {
  const pool = getDbPool();

  if (!pool) {
    return [...memoryGallery].sort((a, b) => b.id - a.id);
  }

  const [rows] = await pool.query("SELECT id, title, image_url, created_at FROM gallery ORDER BY created_at DESC");

  return (rows as Array<Record<string, string | number | Date>>).map((row) => ({
    id: Number(row.id),
    title: String(row.title),
    imageUrl: String(row.image_url),
    createdAt: toIso(row.created_at as Date | string)
  })) satisfies GalleryItem[];
}

export async function createGalleryItem(input: GalleryInput) {
  const pool = getDbPool();

  if (!pool) {
    const item = {
      id: memoryGallery.length ? Math.max(...memoryGallery.map((entry) => entry.id)) + 1 : 1,
      ...input,
      createdAt: new Date().toISOString()
    } satisfies GalleryItem;
    memoryGallery = [item, ...memoryGallery];
    return item;
  }

  const [result] = await pool.query(
    "INSERT INTO gallery (title, image_url, created_at) VALUES (?, ?, NOW())",
    [input.title, input.imageUrl]
  );

  return {
    id: Number((result as { insertId: number }).insertId),
    ...input,
    createdAt: new Date().toISOString()
  } satisfies GalleryItem;
}

export async function updateGalleryItemById(id: number, input: GalleryInput) {
  const pool = getDbPool();

  if (!pool) {
    memoryGallery = memoryGallery.map((item) => (item.id === id ? { ...item, ...input } : item));
    return memoryGallery.find((item) => item.id === id) ?? null;
  }

  const [result] = await pool.query("UPDATE gallery SET title = ?, image_url = ? WHERE id = ?", [
    input.title,
    input.imageUrl,
    id
  ]);

  if (!(result as { affectedRows: number }).affectedRows) {
    return null;
  }

  const items = await listGalleryItems();
  return items.find((item) => item.id === id) ?? null;
}

export async function deleteGalleryItemById(id: number) {
  const pool = getDbPool();

  if (!pool) {
    const before = memoryGallery.length;
    memoryGallery = memoryGallery.filter((item) => item.id !== id);
    return before !== memoryGallery.length;
  }

  const [result] = await pool.query("DELETE FROM gallery WHERE id = ?", [id]);
  return Boolean((result as { affectedRows: number }).affectedRows);
}
