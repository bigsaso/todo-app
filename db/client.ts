// Import the PrismaClient constructor from the Prisma client package.
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient.
const prisma = new PrismaClient();

// Export the instance for use in other parts of your application.
export { prisma };