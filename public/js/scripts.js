const currentPage = window.location.pathname
const menuItems = document.querySelectorAll('header a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href')))
        item.classList.add('active')
}