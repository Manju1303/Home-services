import { PrismaClient, ServiceCategory } from '@prisma/client';
import { hashPassword } from './utils/password';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seeding...');

    // Create admin user
    const admin = await prisma.user.upsert({
        where: { email: 'admin@homeservices.com' },
        update: {},
        create: {
            email: 'admin@homeservices.com',
            password: await hashPassword('admin123'),
            name: 'Admin User',
            role: 'ADMIN',
            phone: '+91 9999999999'
        }
    });
    console.log('✅ Admin user created');

    // Create services
    const services = await Promise.all([
        prisma.service.upsert({
            where: { id: 'service-maid-1' },
            update: {},
            create: {
                id: 'service-maid-1',
                name: 'Maid Service',
                description: 'Professional house cleaning and maid services for your home',
                category: ServiceCategory.MAID,
                basePrice: 150,
                imageUrl: '/images/maid-service.jpg'
            }
        }),
        prisma.service.upsert({
            where: { id: 'service-cook-1' },
            update: {},
            create: {
                id: 'service-cook-1',
                name: 'Cooking Service',
                description: 'Experienced cooks for daily meals and special occasions',
                category: ServiceCategory.COOK,
                basePrice: 200,
                imageUrl: '/images/cook-service.jpg'
            }
        }),
        prisma.service.upsert({
            where: { id: 'service-electrician-1' },
            update: {},
            create: {
                id: 'service-electrician-1',
                name: 'Electrician Service',
                description: 'Licensed electricians for repairs, installations, and maintenance',
                category: ServiceCategory.ELECTRICIAN,
                basePrice: 300,
                imageUrl: '/images/electrician-service.jpg'
            }
        }),
        prisma.service.upsert({
            where: { id: 'service-plumber-1' },
            update: {},
            create: {
                id: 'service-plumber-1',
                name: 'Plumbing Service',
                description: 'Expert plumbers for all your plumbing needs',
                category: ServiceCategory.PLUMBER,
                basePrice: 250,
                imageUrl: '/images/plumber-service.jpg'
            }
        }),
        prisma.service.upsert({
            where: { id: 'service-cleaning-1' },
            update: {},
            create: {
                id: 'service-cleaning-1',
                name: 'Deep Cleaning Service',
                description: 'Comprehensive deep cleaning for homes and offices',
                category: ServiceCategory.CLEANING,
                basePrice: 400,
                imageUrl: '/images/cleaning-service.jpg'
            }
        })
    ]);
    console.log('✅ Services created:', services.length);

    // Create sample provider users
    const provider1User = await prisma.user.upsert({
        where: { email: 'provider1@example.com' },
        update: {},
        create: {
            email: 'provider1@example.com',
            password: await hashPassword('password123'),
            name: 'Rajesh Kumar',
            role: 'PROVIDER',
            phone: '+91 9876543210'
        }
    });

    const provider2User = await prisma.user.upsert({
        where: { email: 'provider2@example.com' },
        update: {},
        create: {
            email: 'provider2@example.com',
            password: await hashPassword('password123'),
            name: 'Priya Sharma',
            role: 'PROVIDER',
            phone: '+91 9876543211'
        }
    });

    // Create provider profiles
    await prisma.serviceProvider.upsert({
        where: { userId: provider1User.id },
        update: {},
        create: {
            userId: provider1User.id,
            specialization: 'Electrician, Plumbing',
            hourlyRate: 300,
            experience: 8,
            bio: 'Experienced electrician and plumber with 8 years of expertise',
            rating: 4.5,
            totalReviews: 24,
            isApproved: true,
            isAvailable: true,
            address: '123 Service Street',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400001'
        }
    });

    await prisma.serviceProvider.upsert({
        where: { userId: provider2User.id },
        update: {},
        create: {
            userId: provider2User.id,
            specialization: 'Maid, Cooking, Cleaning',
            hourlyRate: 180,
            experience: 5,
            bio: 'Professional domestic help with excellent cooking and cleaning skills',
            rating: 4.8,
            totalReviews: 42,
            isApproved: true,
            isAvailable: true,
            address: '456 Home Lane',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400002'
        }
    });
    console.log('✅ Sample providers created');

    // Create test user
    await prisma.user.upsert({
        where: { email: 'user@example.com' },
        update: {},
        create: {
            email: 'user@example.com',
            password: await hashPassword('password123'),
            name: 'Test User',
            role: 'USER',
            phone: '+91 9123456789'
        }
    });
    console.log('✅ Test user created');

    console.log('🎉 Database seeding completed!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@homeservices.com / admin123');
    console.log('Provider 1: provider1@example.com / password123');
    console.log('Provider 2: provider2@example.com / password123');
    console.log('User: user@example.com / password123');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
