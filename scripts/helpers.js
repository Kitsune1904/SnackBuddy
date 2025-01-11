export const isMenuOpen = (isOpen, navigation) => {
    if (isOpen) {
        navigation.menu.style.display = 'flex';
        navigation.closeBtn.style.display = 'block';
        navigation.openBtn.style.display = 'none';
    } else {
        navigation.menu.style.display = 'none';
        navigation.closeBtn.style.display = 'none';
        navigation.openBtn.style.display = 'block';
    }
}

export const isFormOpen = (isOpen, form) => {
    if (isOpen) {
        form.formContainer.style.display = 'flex';
    } else {
        form.formContainer.style.display = 'none';
    }
}