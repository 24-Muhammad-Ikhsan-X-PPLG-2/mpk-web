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
