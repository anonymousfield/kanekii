/* =========================================
   PAGE SYSTEM
========================================= */

let currentPage = 1;

const totalPages = 5;


/* =========================================
   PAGE CHANGE
========================================= */

function showPage(pageNumber) {

    const pages =
        document.querySelectorAll(".page");


    pages.forEach((page) => {

        page.classList.remove("active");

    });


    const nextPageElement =
        document.getElementById(
            `page${pageNumber}`
        );


    if (nextPageElement) {

        nextPageElement.classList.add("active");

        currentPage = pageNumber;

    }
}


/* =========================================
   NEXT PAGE
========================================= */

function nextPage() {

    if (currentPage < totalPages) {

        showPage(currentPage + 1);

    }

}


/* =========================================
   BIRTHDAY REVEAL
========================================= */

function birthdayReveal() {

    /*
        Go to birthday page
    */

    showPage(4);


    const birthdayPage =
        document.getElementById(
            "page4"
        );


    /*
        Reveal photos
    */

    setTimeout(() => {

        birthdayPage.classList.add(
            "photos-visible"
        );

    }, 400);


    /*
        Start balloons
    */

    setTimeout(() => {

        createBalloons();

    }, 300);


    /*
        Start music
    */

    playBirthdayMusic();

}


/* =========================================
   CREATE BALLOONS
========================================= */

function createBalloons() {

    const container =
        document.getElementById(
            "balloon-container"
        );


    /*
        Number of balloons
    */

    const numberOfBalloons = 24;


    for (
        let i = 0;
        i < numberOfBalloons;
        i++
    ) {

        setTimeout(() => {

            createBalloon(container);

        }, i * 220);

    }

}


/* =========================================
   SINGLE BALLOON
========================================= */

function createBalloon(container) {

    const balloon =
        document.createElement(
            "div"
        );


    balloon.classList.add(
        "balloon"
    );


    /*
        Random horizontal position
    */

    balloon.style.left =
        Math.random() * 96 + "%";


    /*
        Random animation duration
    */

    const duration =
        7 + Math.random() * 6;


    balloon.style.setProperty(
        "--duration",
        `${duration}s`
    );


    /*
        Slight random size
    */

    const size =
        0.75 + Math.random() * 0.6;


    balloon.style.transform =
        `scale(${size})`;


    /*
        Different balloon shades
        using CSS filters rather than
        fixed colors
    */

    const hue =
        Math.floor(
            Math.random() * 360
        );


    balloon.style.background =
        `hsl(${hue}, 55%, 62%)`;


    /*
        Add balloon
    */

    container.appendChild(
        balloon
    );


    /*
        Remove it after animation
    */

    setTimeout(() => {

        balloon.remove();

    }, (duration + 1) * 1000);

}


/* =========================================
   MUSIC
========================================= */

function playBirthdayMusic() {

    const music =
        document.getElementById(
            "birthdayMusic"
        );


    if (!music) {
        return;
    }


    music.volume = 0.7;


    /*
        Mobile browsers generally allow
        audio after a user click.

        The birthday button itself is
        the user's interaction.
    */

    music.play()
        .then(() => {

            console.log(
                "Birthday music started."
            );

        })
        .catch((error) => {

            console.log(
                "Music could not autoplay:",
                error
            );

        });

}


/* =========================================
   KEYBOARD SUPPORT
========================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            /*
                Don't accidentally skip
                directly through birthday
                reveal with keyboard.
            */

            if (currentPage === 3) {

                birthdayReveal();

            }

            else {

                nextPage();

            }

        }

    }
);