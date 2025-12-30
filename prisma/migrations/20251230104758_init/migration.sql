-- CreateTable
CREATE TABLE "Request" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "method" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "headers" TEXT NOT NULL,
    "body" TEXT NOT NULL
);
