-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "numero_cliente" TEXT NOT NULL,
    "mes_ref_string" TEXT NOT NULL,
    "mes_ref" INTEGER NOT NULL,
    "ano_ref" INTEGER NOT NULL,
    "data_vencimento" TIMESTAMP(3) NOT NULL,
    "energia_eletrica_kwh" INTEGER,
    "energia_eletrica_preco_unit" DOUBLE PRECISION,
    "energia_eletrica_valor" DOUBLE PRECISION,
    "energia_injetada_kwh" INTEGER,
    "energia_injetada_preco_unit" DOUBLE PRECISION,
    "energia_injetada_valor" DOUBLE PRECISION,
    "en_comp_sem_icms_kwh" INTEGER,
    "en_comp_sem_icms_preco_unit" DOUBLE PRECISION,
    "en_comp_sem_icms_valor" DOUBLE PRECISION,
    "contrib_ilum_publica" DOUBLE PRECISION,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);
