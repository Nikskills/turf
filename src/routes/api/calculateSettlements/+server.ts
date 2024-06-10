import prisma  from '$lib/prisma'; // Adjust the import according to your project structure
import { json } from '@sveltejs/kit';

// Function to fetch balances from the database
async function getBalances() {
  const balances = await prisma.user.findMany({
    where: {
      NOT: { balance: 0 },
    },
    select: {
      id: true, // Assuming you have an id field
      name: true,
      balance: true,
    },
  });
  return balances;
}

// Function to calculate settlements
function calculateSettlements(balances) {
  const debtors = [];
  const creditors = [];

  balances.forEach(user => {
    if (user.balance < 0) {
      debtors.push({ userId: user.id, name: user.name, amount: Math.abs(user.balance) });
    } else if (user.balance > 0) {
      creditors.push({ userId: user.id, name: user.name, amount: user.balance });
    }
  });

  const settlements = [];

  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];

    const settlementAmount = Math.min(debtor.amount, creditor.amount);
    settlements.push({
      debtorId: debtor.userId,
      debtorName: debtor.name,
      creditorId: creditor.userId,
      creditorName: creditor.name,
      amount: settlementAmount,
    });

    debtor.amount -= settlementAmount;
    creditor.amount -= settlementAmount;

    if (debtor.amount === 0) debtors.shift();
    if (creditor.amount === 0) creditors.shift();
  }

  return settlements;
}

// API endpoint to handle calculation requests
export async function POST() {
  const balances = await getBalances();
  const settlements = calculateSettlements(balances);
  return json({ settlements });
}
