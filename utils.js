module.exports = {
    age: function(timestamp) {
        const today = new Date()
        const birthDate = new Date(timestamp)

        let age = today.getFullYear() - birthDate.getFullYear()
        const month = today.getMonth() - birthDate.getMonth()

        if (month <= 0 && today.getDate() <= birthDate.getDate())
            age = age - 1

        return age
    },
    date: function(timestamp) {
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
    graduation: function(level) {
        const degrees = [
            {
                level: "high_school",
                description: "Ensino Médio Completo"
            },
            {
                level: "college",
                description: "Ensino Superior Completo"
            },
            {
                level: "master",
                description: "Mestrado"
            },
            {
                level: "doctor",
                description: "Doutorado"
            }
        ]

        for (degree of degrees){
            if (degree.level == level)
                return degree.description
        }
    },
    grade: function(currentSchoolYear) {
        const schoolYears = [
            {
                schoolYear: '5EF',
                description: '5ª Série'
            },
            {
                schoolYear: '6EF',
                description: '6ª Série'
            },
            {
                schoolYear: '7EF',
                description: '7ª Série'
            },
            {
                schoolYear: '8EF',
                description: '8ª Série'
            },
            {
                schoolYear: '9EF',
                description: '9ª Série'
            },
            {
                schoolYear: '1EM',
                description: '1º Colegial'
            },
            {
                schoolYear: '2EM',
                description: '2º Colegial'
            },
            {
                schoolYear: '3EM',
                description: '3º Colegial'
            }
        ]

        for (schoolYear of schoolYears) {
            if (schoolYear.schoolYear == currentSchoolYear)
                return schoolYear.description
        }
    }
}