import prisma from '../../config/db.js';
import { NotFoundError } from '../../utils/errors.js';

export async function getAllUsers() {
  return prisma.user.findMany({
    select: { id: true, email: true, displayName: true, role: true, avatarUrl: true, createdAt: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateUserRole(userId: string, role: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError('User');

  return prisma.user.update({
    where: { id: userId },
    data: { role },
    select: { id: true, email: true, displayName: true, role: true, avatarUrl: true },
  });
}

export async function deleteUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) throw new NotFoundError('User');
  await prisma.user.delete({ where: { id: userId } });
}
