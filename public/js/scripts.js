const currentPage = window.location.pathname
const menuItems = document.querySelectorAll('header a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href')))
        item.classList.add('active')
}

const pagination = document.querySelector('.pagination')

if(pagination)
    createPagination(pagination)

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)

    let elements = ''

    for(let page of pages) {
        if(String(page).includes('...'))
            elements += `<span>${page}</span>`
        else {
            if(filter)
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            else
                elements += `<a href="?page=${page}">${page}</a>`
        }
    }

    pagination.innerHTML = elements
}

function paginate(selectecPage, totalPages) {
    let pages = [],
        oldPage

    for(let page = 1; page <= totalPages; page++) {
        const firstAndLastPage = page == 1 || page == 2 || page == totalPages || page == totalPages - 1
        const pagesBeforeSelectedPage = page >= selectecPage - 1
        const pagesAfterSelectedPage = page <= selectecPage + 1

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {
            if(oldPage && page - oldPage > 2)
                pages.push('...')
            
            if(oldPage && page - oldPage == 2)
                pages.push(oldPage + 1)
            
            pages.push(page)
            oldPage = page
        }
    }

    return pages
}

const emailElements = document.querySelectorAll('input[type=email]')

emailElements.forEach(emailElement => emailElement.addEventListener('blur', function() {
    Validate.apply(this, 'isEmail')
}))

const Validate = {
    apply(element, func) {
        Validate.clearErrors(element)
        const result = Validate[func](element.value)

        element.value = result.value
        if(result.error)
            Validate.showError(element, result.error)
    },
    clearErrors(element) {
        const itemElement = element.parentNode
        const errorElement = itemElement.querySelector('.error')

        if(errorElement)
            errorElement.remove()
    },
    showError(element, error) {
        const itemElement = element.parentNode
        const spanError = document.createElement('span')

        spanError.classList.add('error')
        spanError.innerHTML = error

        itemElement.appendChild(spanError)
        element.focus()
    },
    isEmail(value) {
        let error = ''
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if(!value.match(mailFormat))
            error = 'Email inválido!'

        return {
            value,
            error
        }
    }
}