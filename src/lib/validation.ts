import { z } from 'zod';

export const userSchema = z.object({
  user_name: z.string().min(1),
  // email: z.string().email(),
});
export const investasiSchema = z.object({
  nama: z.string().min(1, "Nama wajib diisi"),
  tgl_transaksi: z.coerce.date(),
  gramasi: z.coerce.number(),
  harga_beli: z.coerce.number(),
  harga_jual: z.coerce.number(),
  status: z.string().min(1, "Status wajib diisi"),
});

export type UserInput = z.infer<typeof userSchema>;
export type InvestasiInput = z.infer<typeof investasiSchema>;
