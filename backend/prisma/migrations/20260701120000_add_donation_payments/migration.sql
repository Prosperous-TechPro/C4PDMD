-- AlterTable
ALTER TABLE "Donation" ADD COLUMN     "paymentReference" TEXT,
ADD COLUMN     "paymentProvider" TEXT NOT NULL DEFAULT 'PAYSTACK',
ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'GHS',
ADD COLUMN     "paidAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "Donation_paymentReference_key" ON "Donation"("paymentReference");