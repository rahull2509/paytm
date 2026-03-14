import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { prisma as db } from "@repo/db/client";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getOnRampTransactions(userId: number) {
  try {
    const txns = await db.onRampTransaction.findMany({
      where: { userId },
    });
    return txns.map((t) => ({
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.provider,
    }));
  } catch {
    return [];
  }
}

export default async function TransactionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  const userId = Number(session.user.id);
  const transactions = await getOnRampTransactions(userId);

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transactions
      </div>
      <div className="p-4">
        <OnRampTransactions transactions={transactions} />
      </div>
    </div>
  );
}
