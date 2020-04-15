module.exports = {
    age(timestamp) {
        const today = new Date(Date.now())
        const birthDate = new Date(timestamp)

        let age = today.getUTCFullYear() - birthDate.getUTCFullYear()
        const month = today.getUTCMonth() - birthDate.getUTCMonth()

        if ((month < 0) || (month == 0 && today.getUTCDate() < birthDate.getUTCDate()))
            age = age - 1

        return age
    },
    date(timestamp) {
        const date = new Date(timestamp)
        const year = `000${date.getUTCFullYear()}`.slice(-4)
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            year,
            month,
            day,
            brFullDate: `${day}/${month}/${year}`,
            isoFullDate: `${year}-${month}-${day}`
        }
    },
    graduation(level) {
        const education_levels = [
            {
                name: "high_school",
                description: "Ensino Médio Completo"
            },
            {
                name: "college",
                description: "Ensino Superior Completo"
            },
            {
                name: "master",
                description: "Mestrado"
            },
            {
                name: "doctor",
                description: "Doutorado"
            }
        ]

        for (education_level of education_levels){
            if (education_level.name == level)
                return education_level.description
        }
    },
    grade(currentSchoolYear) {
        const school_years = [
            {
                school_year: '5EF',
                description: '5ª Série'
            },
            {
                school_year: '6EF',
                description: '6ª Série'
            },
            {
                school_year: '7EF',
                description: '7ª Série'
            },
            {
                school_year: '8EF',
                description: '8ª Série'
            },
            {
                school_year: '9EF',
                description: '9ª Série'
            },
            {
                school_year: '1EM',
                description: '1º Colegial'
            },
            {
                school_year: '2EM',
                description: '2º Colegial'
            },
            {
                school_year: '3EM',
                description: '3º Colegial'
            }
        ]

        for (schoolYear of school_years) {
            if (schoolYear.school_year == currentSchoolYear)
                return schoolYear.description
        }
    }
}