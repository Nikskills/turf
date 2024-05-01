// eslint-disable-next-line @typescript-eslint/no-var-requires
const { PrismaClient, Type } = require('@prisma/client');


const prisma = new PrismaClient()

const userData = [
    { name: 'John Doe', email: 'john.doe@example.com', password: 'password123', balance: 100.0 },
    { name: 'Jane Smith', email: 'jane.smith@example.com', password: 'password456', balance: 150.0 }
];

const purchaseData = [
    { buyerId: '', quantityOfBeers: 10, cost: 20.0, purchaseDate: new Date() },
    { buyerId: '', quantityOfBeers: 5, cost: 10.0, purchaseDate: new Date() }
];

const sessionData = [
    { creatorId: '', description: 'Friday Night Drinks', date: new Date() },
    { creatorId: '', description: 'Saturday Hangout', date: new Date() }
];

const consumptionData = [
    { sessionId: '', consumerId: '', quantity: 3 },
    { sessionId: '', consumerId: '', quantity: 2 }
];

const stockTransactionData = [
    { change_amount: 15, transactionType: Type.PURCHASE, transactionDate: new Date() },
    { change_amount: -5, transactionType: Type.CONSUMPTION, transactionDate: new Date() }
];

async function resetDatabase() {
    await prisma.user.deleteMany({});
    console.log("Cleared previous user data.");
    // Add other models if necessary
}

async function main() {
    await resetDatabase();
    
    console.log(`Start seeding ...`);

    // Create users
    for (const user of userData) {
        const createdUser = await prisma.user.create({
            data: user
        });
        console.log(`Created user with id: ${createdUser.id}`);
    }

    // Create purchases
    for (const purchase of purchaseData) {
        const createdPurchase = await prisma.purchase.create({
            data: {
                ...purchase,
                buyerId: (await prisma.user.findFirst()).id
            }
        });
        console.log(`Created purchase with id: ${createdPurchase.purchaseId}`);
    }

    // Create sessions
    for (const session of sessionData) {
        const createdSession = await prisma.consumptionSession.create({
            data: {
                ...session,
                creatorId: (await prisma.user.findFirst()).id
            }
        });
        console.log(`Created session with id: ${createdSession.consumptionSessionId}`);
    }

    // Create consumptions
    for (const consumption of consumptionData) {
        const createdConsumption = await prisma.consumption.create({
            data: {
                ...consumption,
                sessionId: (await prisma.consumptionSession.findFirst()).consumptionSessionId,
                consumerId: (await prisma.user.findFirst()).id
            }
        });
        console.log(`Created consumption with id: ${createdConsumption.consumptionId}`);
    }

    // Create stock transactions
    for (const transaction of stockTransactionData) {
        const createdTransaction = await prisma.stockTransaction.create({
            data: transaction
        });
        console.log(`Created stock transaction with id: ${createdTransaction.transactionId}`);
    }

    console.log(`Seeding finished.`);
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });