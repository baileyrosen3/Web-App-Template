import { PrismaClient, Prisma } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create an admin user
  const hashedPassword = await bcrypt.hash('adminpassword', 10)
  
  const adminUserData: Prisma.UserCreateInput = {
    email: 'admin@example.com',
    name: 'Admin User',
    password: hashedPassword,
    role: 'ADMIN',
    accounts: {
      create: {
        type: 'credentials',
        provider: 'local'
      }
    }
  }

  const adminUser = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: adminUserData
  })

  // Create a sample post
  const samplePostData = {
    title: 'First Sample Post',
    content: 'This is a sample post created during seeding.',
    published: true,
    author: {
      connect: { id: adminUser.id }
    }
  } satisfies Prisma.PostCreateInput

  const samplePost = await prisma.post.create({
    data: samplePostData
  })

  console.log({ adminUser, samplePost })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 