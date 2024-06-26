-- CreateTable
CREATE TABLE "products_table" (
    "id" TEXT NOT NULL,
    "product_thumbnail" TEXT NOT NULL,
    "product_title" TEXT NOT NULL,
    "product _description" TEXT NOT NULL,
    "product_cost" INTEGER NOT NULL,
    "onOffer" TEXT NOT NULL,

    CONSTRAINT "products_table_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "products_table_product_title_key" ON "products_table"("product_title");
