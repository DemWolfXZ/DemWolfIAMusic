document.addEventListener('DOMContentLoaded', () => {

    /* =========================================================
       SELECTOR DE CUENTAS DE REDES SOCIALES
    ========================================================= */

    const accountCards = document.querySelectorAll('.social-account-card');


    /**
     * Cierra todos los selectores de cuentas.
     *
     * @param {HTMLElement|null} menuToKeepOpen
     * Menú que debe permanecer abierto, si corresponde.
     */
    function closeAllAccountMenus(menuToKeepOpen = null) {

        accountCards.forEach(card => {

            const trigger = card.querySelector('.social-account-trigger');
            const menu = card.querySelector('.social-account-menu');

            if (!menu || menu === menuToKeepOpen) {
                return;
            }

            menu.classList.remove('is-open');

            if (trigger) {
                trigger.setAttribute('aria-expanded', 'false');
            }

        });

    }


    accountCards.forEach(card => {

        const trigger = card.querySelector('.social-account-trigger');
        const menu = card.querySelector('.social-account-menu');
        const closeButton = card.querySelector('.social-account-close');
        const accountLinks = card.querySelectorAll('a.social-account-option');


        if (!trigger || !menu) {
            return;
        }


        /* =====================================================
           ABRIR / CERRAR CON EL BOTÓN DE LA PLATAFORMA
        ====================================================== */

        trigger.addEventListener('click', event => {

            event.stopPropagation();

            const isAlreadyOpen =
                menu.classList.contains('is-open');


            /*
             * Primero cerramos cualquier otro selector que
             * estuviera abierto.
             */
            closeAllAccountMenus();


            /*
             * Si este selector estaba cerrado, lo abrimos.
             * Si estaba abierto, queda cerrado.
             */
            if (!isAlreadyOpen) {

                menu.classList.add('is-open');

                trigger.setAttribute(
                    'aria-expanded',
                    'true'
                );

            } else {

                menu.classList.remove('is-open');

                trigger.setAttribute(
                    'aria-expanded',
                    'false'
                );

            }

        });


        /* =====================================================
           EVITAR QUE UN CLICK DENTRO DEL MENÚ LO CIERRE
        ====================================================== */

        menu.addEventListener('click', event => {

            event.stopPropagation();

        });


        /* =====================================================
           BOTÓN X
        ====================================================== */

        if (closeButton) {

            closeButton.addEventListener('click', event => {

                event.preventDefault();

                event.stopPropagation();

                menu.classList.remove('is-open');

                trigger.setAttribute(
                    'aria-expanded',
                    'false'
                );

                trigger.focus();

            });

        }


        /* =====================================================
           CERRAR DESPUÉS DE ELEGIR UNA CUENTA
        ====================================================== */

        accountLinks.forEach(link => {

            link.addEventListener('click', () => {

                menu.classList.remove('is-open');

                trigger.setAttribute(
                    'aria-expanded',
                    'false'
                );

            });

        });

    });


    /* =========================================================
       CLICK FUERA DEL SELECTOR
    ========================================================= */

    document.addEventListener('click', () => {

        closeAllAccountMenus();

    });


    /* =========================================================
       TECLA ESCAPE
    ========================================================= */

    document.addEventListener('keydown', event => {

        if (event.key === 'Escape') {

            closeAllAccountMenus();

        }

    });

});