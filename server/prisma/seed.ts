import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing data
  await prisma.comment.deleteMany();
  await prisma.task.deleteMany();
  await prisma.label.deleteMany();
  await prisma.user.deleteMany();

  // Create labels
  const labels = await Promise.all([
    prisma.label.create({ data: { name: 'Bug', color: '#ef4444' } }),
    prisma.label.create({ data: { name: 'Feature', color: '#6366f1' } }),
    prisma.label.create({ data: { name: 'Enhancement', color: '#8b5cf6' } }),
    prisma.label.create({ data: { name: 'Documentation', color: '#06b6d4' } }),
    prisma.label.create({ data: { name: 'Design', color: '#f59e0b' } }),
    prisma.label.create({ data: { name: 'Backend', color: '#10b981' } }),
    prisma.label.create({ data: { name: 'Frontend', color: '#ec4899' } }),
  ]);

  // Create users
  const adminHash = await bcrypt.hash('admin123', 12);
  const userHash = await bcrypt.hash('user123', 12);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@taskflow.dev',
      passwordHash: adminHash,
      displayName: 'Admin User',
      role: 'ADMIN',
    },
  });

  const user1 = await prisma.user.create({
    data: {
      email: 'sarah@taskflow.dev',
      passwordHash: userHash,
      displayName: 'Sarah Chen',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'alex@taskflow.dev',
      passwordHash: userHash,
      displayName: 'Alex Rivera',
    },
  });

  // Create tasks
  await prisma.task.createMany({
    data: [
      {
        title: 'Set up CI/CD pipeline',
        description: 'Configure GitHub Actions for automated testing and deployment. Include lint checks, unit tests, and build verification.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        creatorId: admin.id,
        assigneeId: user1.id,
        dueDate: new Date('2026-07-01'),
      },
      {
        title: 'Design landing page mockups',
        description: 'Create high-fidelity mockups for the new marketing landing page. Include mobile and desktop variants.',
        status: 'TODO',
        priority: 'MEDIUM',
        creatorId: admin.id,
        assigneeId: user2.id,
        dueDate: new Date('2026-07-05'),
      },
      {
        title: 'Fix authentication token refresh bug',
        description: 'Users are being logged out unexpectedly when their access token expires. The refresh mechanism needs to be fixed.',
        status: 'IN_REVIEW',
        priority: 'URGENT',
        creatorId: user1.id,
        assigneeId: user1.id,
        dueDate: new Date('2026-06-25'),
      },
      {
        title: 'Implement task filtering API',
        description: 'Add query parameters for filtering tasks by status, priority, assignee, and date range.',
        status: 'DONE',
        priority: 'HIGH',
        creatorId: admin.id,
        assigneeId: user1.id,
      },
      {
        title: 'Write API documentation',
        description: 'Document all REST endpoints using OpenAPI/Swagger specification. Include request/response examples.',
        status: 'TODO',
        priority: 'LOW',
        creatorId: user2.id,
        assigneeId: user2.id,
        dueDate: new Date('2026-07-15'),
      },
      {
        title: 'Add dark mode support',
        description: 'Implement CSS custom properties for theming. Support system preference detection and manual toggle.',
        status: 'TODO',
        priority: 'MEDIUM',
        creatorId: user1.id,
        assigneeId: user2.id,
      },
      {
        title: 'Optimize database queries',
        description: 'Add indexes to frequently queried columns. Implement query result caching for dashboard stats.',
        status: 'IN_PROGRESS',
        priority: 'HIGH',
        creatorId: admin.id,
        assigneeId: user1.id,
        dueDate: new Date('2026-06-30'),
      },
      {
        title: 'User onboarding flow',
        description: 'Create a guided tour for new users that highlights key features and explains task management workflow.',
        status: 'TODO',
        priority: 'LOW',
        creatorId: user2.id,
      },
    ],
  });

  console.log('✅ Seed complete!');
  console.log(`   ${labels.length} labels`);
  console.log('   3 users (admin@taskflow.dev / admin123, sarah@taskflow.dev / user123, alex@taskflow.dev / user123)');
  console.log('   8 tasks');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
