export type ProfileType = {
  id: string;
  username: string;
  email: string;
  avatar_url: string | null;
  role: string;
  desc: string;
};

export type SeminarPhotoType = {
  id: string;
  created_at: string;
  name: string;
  deskripsi: string;
  tgl: string;
  img_url: string;
};

export type ConfigType<T> = {
  id: number;
  created_at: string;
  name: string;
  value: T;
};

export type ConfigImageWallpaperType = {
  name: string;
  image_url: string;
};

export type InviteCodeType = {
  id: number;
  created_at: string;
  code: string;
  person: string;
  expires_at: string;
  is_used: string;
};
