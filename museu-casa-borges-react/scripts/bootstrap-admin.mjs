import { randomBytes, scryptSync } from "node:crypto"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const isProduction = process.env.NODE_ENV === "production"
const email =
  process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase() ??
  (isProduction ? undefined : "admin@museucasaborges.local")
const password =
  process.env.ADMIN_BOOTSTRAP_PASSWORD?.trim() ??
  (isProduction ? undefined : "admin123")
const name =
  process.env.ADMIN_BOOTSTRAP_NAME?.trim() ||
  "Administrador Museu Casa Borges"

if (!email || !password) {
  console.error(
    "Defina ADMIN_BOOTSTRAP_EMAIL e ADMIN_BOOTSTRAP_PASSWORD para criar o admin."
  )
  process.exit(1)
}

const passwordSalt = randomBytes(16).toString("hex")
const passwordHash = scryptSync(password, passwordSalt, 64).toString("hex")

try {
  const adminUser = await prisma.adminUser.upsert({
    where: {
      email,
    },
    update: {
      nome: name,
      passwordSalt,
      passwordHash,
      ativo: true,
    },
    create: {
      nome: name,
      email,
      passwordSalt,
      passwordHash,
      ativo: true,
    },
    select: {
      id: true,
      email: true,
      nome: true,
      ativo: true,
    },
  })

  console.log(
    JSON.stringify(
      {
        ok: true,
        adminUser,
      },
      null,
      2
    )
  )
} catch (error) {
  console.error(error)
  process.exitCode = 1
} finally {
  await prisma.$disconnect()
}
