import prisma from '$lib/prisma'; // Ensure correct path to prisma client
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

// POST handler to calculate and create settlements
export const POST: RequestHandler = async () => {
  const unpaidSettlements = await prisma.settlement.findMany({
    where: { paid: false },
    include: {
      debtor: {
        select: { name: true, id: true}
      },
      creditor: {
        select: { name: true, id: true}
      }
    },
  });

  if (unpaidSettlements.length > 0) {
    const formattedUnpaidSettlements = unpaidSettlements.map(settlement => ({
      debtorName: settlement.debtor.name,
      creditorName: settlement.creditor.name,
      amount: settlement.amount,
      paid: settlement.paid,
      debtorId: settlement.debtorId,
      creditorId: settlement.creditorId
    }));

    return json(
      { 
        error: 'There are unpaid settlements. Please settle all previous records before recalculating.',
        settlements: formattedUnpaidSettlements 
      },
      { status: 400 } // Optional: Set HTTP status code to 400 for bad request
    );
  }
  const balances = await prisma.user.findMany({
    where: {
      NOT: { balance: 0 },
    },
    select: {
      id: true,
      name: true,
      balance: true,
    },
  });

  const debtors = balances.filter(user => user.balance < 0).map(user => ({
    userId: user.id,
    name: user.name,
    amount: Math.abs(user.balance),
  }));

  const creditors = balances.filter(user => user.balance > 0).map(user => ({
    userId: user.id,
    name: user.name,
    amount: user.balance,
  }));

  const settlements = [];

  while (debtors.length > 0 && creditors.length > 0) {
    const debtor = debtors[0];
    const creditor = creditors[0];

    const settlementAmount = Math.min(debtor.amount, creditor.amount);
    settlements.push({
      debtorId: debtor.userId,
      creditorId: creditor.userId,
      amount: settlementAmount,
      paid: false,
    });

    debtor.amount -= settlementAmount;
    creditor.amount -= settlementAmount;

    if (debtor.amount === 0) debtors.shift();
    if (creditor.amount === 0) creditors.shift();
  }

  if (settlements.length > 0) {
    await prisma.settlement.createMany({
      data: settlements,
    });
  }

  // Fetch the created settlements with user names included
  const fetchedSettlements = await prisma.settlement.findMany({
    include: {
      debtor: {
        select: {
          id: true,   
          name: true, 
        },
      },
      creditor: {
        select: {
          id: true,  
          name: true, 
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  

  // Format the response to include user names
  const formattedSettlements = fetchedSettlements.map(fetchedSettlement => ({
    debtorName: fetchedSettlement.debtor.name,
    creditorName: fetchedSettlement.creditor.name,
    amount: fetchedSettlement.amount,
    paid: fetchedSettlement.paid,
    debtorId: fetchedSettlement.debtor.id,
    creditorId: fetchedSettlement.creditor.id
  }));
  return json({ settlements: formattedSettlements });
};
