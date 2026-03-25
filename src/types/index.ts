export type User = {
  id: number;
  name: string;
  church: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type Registration = {
  id: number;
  name: string;
  church: string;
  email: string;
  phone: string;
  createdAt: string;
};

export type Notice = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export type GalleryItem = {
  id: number;
  title: string;
  imageUrl: string;
  createdAt: string;
};

export type RegistrationInput = Omit<Registration, "id" | "createdAt">;

export type NoticeInput = Omit<Notice, "id" | "createdAt">;

export type GalleryInput = Omit<GalleryItem, "id" | "createdAt">;

export type UploadResponse = {
  url: string;
};
