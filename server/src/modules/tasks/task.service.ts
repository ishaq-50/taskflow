import prisma from '../../config/db.js';
import { NotFoundError, ForbiddenError } from '../../utils/errors.js';

interface TaskFilters {
  status?: string;
  priority?: string;
  assigneeId?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export async function getTasks(filters: TaskFilters) {
  const {
    status,
    priority,
    assigneeId,
    search,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 20,
  } = filters;

  const where: any = {};

  if (status) {
    where.status = { in: status.split(',') };
  }
  if (priority) {
    where.priority = { in: priority.split(',') };
  }
  if (assigneeId) {
    where.assigneeId = assigneeId;
  }
  if (search) {
    where.OR = [
      { title: { contains: search } },
      { description: { contains: search } },
    ];
  }

  const [tasks, total] = await Promise.all([
    prisma.task.findMany({
      where,
      include: {
        creator: { select: { id: true, displayName: true, avatarUrl: true } },
        assignee: { select: { id: true, displayName: true, avatarUrl: true } },
        labels: true,
        _count: { select: { comments: true } },
      },
      orderBy: { [sortBy]: sortOrder },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.task.count({ where }),
  ]);

  return {
    tasks,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}

export async function getTaskById(id: string) {
  const task = await prisma.task.findUnique({
    where: { id },
    include: {
      creator: { select: { id: true, displayName: true, avatarUrl: true } },
      assignee: { select: { id: true, displayName: true, avatarUrl: true } },
      labels: true,
      comments: {
        include: {
          author: { select: { id: true, displayName: true, avatarUrl: true } },
        },
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!task) {
    throw new NotFoundError('Task');
  }

  return task;
}

interface CreateTaskData {
  title: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string;
  assigneeId?: string;
  labelIds?: string[];
}

export async function createTask(creatorId: string, data: CreateTaskData) {
  const { labelIds, dueDate, ...rest } = data;

  const task = await prisma.task.create({
    data: {
      ...rest,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      creatorId,
      labels: labelIds ? { connect: labelIds.map(id => ({ id })) } : undefined,
    },
    include: {
      creator: { select: { id: true, displayName: true, avatarUrl: true } },
      assignee: { select: { id: true, displayName: true, avatarUrl: true } },
      labels: true,
      _count: { select: { comments: true } },
    },
  });

  return task;
}

interface UpdateTaskData {
  title?: string;
  description?: string;
  status?: string;
  priority?: string;
  dueDate?: string | null;
  assigneeId?: string | null;
  labelIds?: string[];
}

export async function updateTask(taskId: string, userId: string, userRole: string, data: UpdateTaskData) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new NotFoundError('Task');
  }

  // Only creator, assignee, or admin can update
  if (task.creatorId !== userId && task.assigneeId !== userId && userRole !== 'ADMIN') {
    throw new ForbiddenError('You can only edit tasks you created or are assigned to');
  }

  const { labelIds, dueDate, ...rest } = data;

  const updated = await prisma.task.update({
    where: { id: taskId },
    data: {
      ...rest,
      dueDate: dueDate === null ? null : dueDate ? new Date(dueDate) : undefined,
      labels: labelIds ? { set: labelIds.map(id => ({ id })) } : undefined,
    },
    include: {
      creator: { select: { id: true, displayName: true, avatarUrl: true } },
      assignee: { select: { id: true, displayName: true, avatarUrl: true } },
      labels: true,
      _count: { select: { comments: true } },
    },
  });

  return updated;
}

export async function deleteTask(taskId: string, userId: string, userRole: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new NotFoundError('Task');
  }

  if (task.creatorId !== userId && userRole !== 'ADMIN') {
    throw new ForbiddenError('Only the task creator or an admin can delete this task');
  }

  await prisma.task.delete({ where: { id: taskId } });
}

export async function addComment(taskId: string, authorId: string, content: string) {
  const task = await prisma.task.findUnique({ where: { id: taskId } });
  if (!task) {
    throw new NotFoundError('Task');
  }

  const comment = await prisma.comment.create({
    data: { content, taskId, authorId },
    include: {
      author: { select: { id: true, displayName: true, avatarUrl: true } },
    },
  });

  return comment;
}

export async function getLabels() {
  return prisma.label.findMany({ orderBy: { name: 'asc' } });
}
