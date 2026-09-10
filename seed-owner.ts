import { PrismaClient } from '@prisma/client'
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const prisma = new PrismaClient()

// Initialize Supabase Admin Client using the Service Role Key
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

async function main() {
  const email = 'owner@omniview.edu'
  const password = 'Password123!'

  console.log('1. Creating Supabase Auth User...')
  let authUserId: string
  const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers()
  const found = existingUser?.users.find(u => u.email === email)

  if (found) {
    console.log('Auth user already exists, using existing ID:', found.id)
    authUserId = found.id
  } else {
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })

    if (authError) {
      throw new Error(`Supabase Auth Error: ${authError.message}`)
    }
    
    console.log('Auth user created:', authData.user.id)
    authUserId = authData.user.id
  }

  console.log('2. Creating Global HQ Tenant in Prisma...')
  let tenant = await prisma.tenant.findUnique({ where: { slug: 'hq' } })
  
  if (!tenant) {
    tenant = await prisma.tenant.create({
      data: {
        name: 'OmniviewEdu Global HQ',
        slug: 'hq',
        email: 'hello@omniview.edu',
        phone_number: '1234567890'
      }
    })
    console.log('Tenant created:', tenant.id)
  } else {
    console.log('Tenant already exists:', tenant.id)
  }

  console.log('3. Creating User record in Prisma...')
  const existingPrismaUser = await prisma.user.findUnique({ where: { id: authUserId } })

  if (!existingPrismaUser) {
    const user = await prisma.user.create({
      data: {
        id: authUserId,
        tenant_id: tenant.id,
        email: email,
        role: 'PLATFORM_OWNER',
        first_name: 'Platform',
        last_name: 'Owner',
      }
    })
    console.log('Prisma User created:', user.id)
  } else {
    // Ensure role is correct
    await prisma.user.update({
      where: { id: authUserId },
      data: { role: 'PLATFORM_OWNER' }
    })
    console.log('Prisma User updated to PLATFORM_OWNER.')
  }

  console.log('Seed completed successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
