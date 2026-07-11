import z from "zod";
export const loginSchema = z.object({
    email: z.email("invalid Email"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    // role: z.enum(["ADMIN", "SUPER_ADMIN", "DOCTOR", "PATIENT"]).optional(),
});

export type ILogin = z.infer<typeof loginSchema>;
