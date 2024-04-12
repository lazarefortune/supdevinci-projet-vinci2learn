import { PrismaClient } from "@prisma/client";
import { faker } from "@faker-js/faker";
import {hash} from "bcrypt";

const prisma = new PrismaClient();

const hashPassword = async (password) => {
    return await hash(password, 10);
}

const generateRandomUsers = async (count) => {
    const users = [];
    const userPassword = await hashPassword("password");
    for (let i = 0; i < count; i++) {
        users.push({
            email: faker.internet.email(),
            name: faker.person.fullName(),
            password: userPassword
        });
    }
    return users;
}

const generateRandomLessons = async (count = null) => {
    if (!count) {
        count = faker.number.int({min: 1, max: 10});
    }
    const lessons = [];
    for (let i = 0; i < count; i++) {
        lessons.push({
            title: faker.lorem.words(),
            content: faker.lorem.paragraph(),
            order: i + 1
        });
    }
    return lessons;
};

const generateRandomCoursesAndLessons = async (count) => {
    const courses = [];
    for (let i = 0; i < count; i++) {
        const lessons = await generateRandomLessons();
        const course = {
            title: faker.lorem.words(),
            description: faker.lorem.sentence(),
            teacher: {
                create: {
                    email: faker.internet.email(),
                    name: faker.person.fullName(),
                    password: await hashPassword("password")
                }
            },
            lessons: {
                create: lessons
            }
        };
        courses.push(course);
    }
    return courses;
};
async function main() {
    // const firstUser = {
    //     email: "toto@gmail.com",
    //     name: "TOTO",
    //     password: await hash("test", 10),
    // }
    //
    // await prisma.user.create({
    //     data: firstUser
    // });

    // Generate 10 random users
    const users = await generateRandomUsers(10);
    await prisma.user.createMany({
        data: users,
        skipDuplicates: true
    });

    const courses = await generateRandomCoursesAndLessons(3);
    for (const course of courses) {
        await prisma.course.create({
            data: course
        });
    }
}

main().catch((e) => {
    console.error(e);
    process.exit(1)
}).finally(async () => {
    await prisma.$disconnect();
});