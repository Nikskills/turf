// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()
const users = {
    '1': {
        name: 'John',
        email: 'john@example.com',
        password: 'password',
        balance: 0.0
    }
}


async function main() {
    console.log(`Start seeding ...`)
    const user = await prisma.user.create({
        data: {
            name: users[1].name,
            email: users[1].email,
            password: users[1].password,
            balance: users[1].balance
        }
    })
    console.log(`Created user with id: ${user.id}`)
    console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })