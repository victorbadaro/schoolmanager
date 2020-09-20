const faker = require('faker/locale/pt_BR')
const { date } = require('./src/lib/utils')

const Teacher = require('./src/app/models/Teacher')
const Student = require('./src/app/models/Student')

let teachersIDs = []
let totalTeachers = 10
let totalStudents = 5

async function createTeachers() {
    const teachers = []
    const education_levels = ['high_school', 'college', 'master', 'doctor']
    const class_types = ['presential', 'e-learning']

    while(teachers.length < totalTeachers) {
        let subjects_taught = faker.name.jobArea()

        for(let i = 0; i < faker.random.number(2); i++)
            subjects_taught += `, ${faker.name.jobArea()}`

        teachers.push({
            avatar_url: faker.internet.avatar(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            birth_date: date(faker.date.between(1950, '2000-01-01')).isoFullDate,
            education_level: faker.random.arrayElement(education_levels),
            class_type: faker.random.arrayElement(class_types),
            subjects_taught
        })
    }

    const teachersPromises = teachers.map(teacher => Teacher.create(teacher))
    teachersIDs = await Promise.all(teachersPromises)
}

async function createStudents() {
    const students = []
    const school_years = ['5EF', '6EF', '7EF', '8EF', '9EF', '1EM', '2EM', '3EM']

    while(students.length < totalStudents) {
        students.push({
            avatar_url: faker.internet.avatar(),
            name: `${faker.name.firstName()} ${faker.name.lastName()}`,
            birth_date: date(faker.date.between(1950, '2000-01-01')).isoFullDate,
            email: faker.internet.email(),
            school_year: faker.random.arrayElement(school_years),
            hours_by_week: faker.random.number(44),
            teacher_id: faker.random.arrayElement(teachersIDs)
        })
    }

    const studentsPromises = students.map(student => Student.create(student))
    await Promise.all(studentsPromises)
}

async function init() {
    await createTeachers()
    await createStudents()
}

init()