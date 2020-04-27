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
        const firstAndLastPage = page == 1 || page == totalPages
        const pagesBeforeSelectedPage = page >= selectecPage - 2
        const pagesAfterSelectedPage = page <= selectecPage + 2

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