-- CreateTable
CREATE TABLE "FundMovement" (
    "id" SERIAL NOT NULL,
    "initiatedBy" TEXT NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "reason" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FundMovement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "FundMovement" ADD CONSTRAINT "FundMovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
