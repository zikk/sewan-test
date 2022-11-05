-- CreateTable
CREATE TABLE "messages" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,

    CONSTRAINT "messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "messages_status" (
    "message_id" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "sent_at" TIMESTAMP(3),
    "status" TEXT NOT NULL,
    "fail_message" TEXT,

    CONSTRAINT "messages_status_pkey" PRIMARY KEY ("message_id","target")
);

-- AddForeignKey
ALTER TABLE "messages_status" ADD CONSTRAINT "messages_status_message_id_fkey" FOREIGN KEY ("message_id") REFERENCES "messages"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
