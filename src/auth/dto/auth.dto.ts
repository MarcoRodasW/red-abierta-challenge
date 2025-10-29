import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export enum Role {
  ADMIN,
  USER,
}

const RoleSchema = z.enum(['ADMIN', 'USER']);

export const SignInSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export const SignUpSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(3, 'Password must be at least 3 characters'),
});

export const UserSchema = z.object({
  id: z.string(),
  username: z.string(),
  role: RoleSchema,
  isActive: z.boolean(),
});

export const UpdateUsernameSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
});

export const ChangeUserRoleSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  role: RoleSchema,
});

export const BlockUserSchema = z.object({
  userId: z.string().uuid('Invalid user ID format'),
  isActive: z.boolean(),
});

export class SignInDTO extends createZodDto(SignInSchema) {}
export class SignUpDTO extends createZodDto(SignUpSchema) {}
export class UserDTO extends createZodDto(UserSchema) {}
export class UpdateUsernameDTO extends createZodDto(UpdateUsernameSchema) {}
export class ChangeUserRoleDTO extends createZodDto(ChangeUserRoleSchema) {}
export class BlockUserDTO extends createZodDto(BlockUserSchema) {}

export type SignIn = z.infer<typeof SignInSchema>;
export type SignUp = z.infer<typeof SignUpSchema>;
export type UpdateUsername = z.infer<typeof UpdateUsernameSchema>;
export type ChangeUserRole = z.infer<typeof ChangeUserRoleSchema>;
export type BlockUser = z.infer<typeof BlockUserSchema>;
