import { User } from '@prisma/client';

export type UserProfile = Omit<User, 'token' | 'codeVerifier'>;
