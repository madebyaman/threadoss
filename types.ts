import { Article, User } from '@prisma/client';

export type UserProfile = Omit<User, 'token' | 'codeVerifier'>;
export type ArticleDashboard = Omit<Article, 'content' | 'authorId'>;
