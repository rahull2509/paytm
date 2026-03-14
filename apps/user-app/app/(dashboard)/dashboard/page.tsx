import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../lib/auth";
import { prisma as db } from "@repo/db/client";
import { BalanceCard } from "../../../components/BalanceCard";
import { OnRampTransactions } from "../../../components/OnRampTransactions";

async function getBalance(userId: number) {
  try {
    const balance = await db.balance.findFirst({
      where: { userId },
    });
    return {
      amount: balance?.amount ?? 0,
      locked: balance?.locked ?? 0,
    };
  } catch {
    return { amount: 0, locked: 0 };
  }
}

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

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/api/auth/signin");
  }
  const userId = Number(session.user.id);
  const balance = await getBalance(userId);
  const transactions = await getOnRampTransactions(userId);

  return (
    <div className="w-full">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Dashboard
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
        </div>
        <div>
          <OnRampTransactions transactions={transactions} />
        </div>
      </div>
    </div>
  );
}
