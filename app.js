(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

const scriptURL = 'https://script.google.com/macros/s/AKfycbxD2e-CnmNMhkebBJAUqcgOfdx_Q1hB9Xv1ekdgZlLOcoMPGckXb2SiE2VDpfdh1Ip2YA/exec';


document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contact-form');
    const sendButton = document.getElementById('send');

    sendButton.addEventListener('click', function (e) {
        e.preventDefault();

                // Validate form inputs
                if (!form.checkValidity()) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Invalid input',
                        text: 'Please fill in all required fields.',
                        customClass: {
                            backdrop: 'swal2-backdrop-color',
                            popup: 'swal2-popup-color'
                        }
                    });
                    return;
                }

        // Show SweetAlert immediately when the submit button is clicked
        Swal.fire({
            icon: 'info',
            title: 'Please wait...',
            text: 'Sending your message',
            showConfirmButton: false,
            allowOutsideClick: false,
            customClass: {
                backdrop: 'swal2-backdrop-color',
                popup: 'swal2-popup-color'
            }
        });

        // Make the fetch request to the server
        fetch(scriptURL, { method: 'POST', body: new FormData(form) })
            .then(response => {
                // Handle response here
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Your message is sent. Thank you for reaching out.',
                    width: 600,
                    padding: "3em",
                    timer: 5000, // Set timer for 5 seconds
                    timerProgressBar: true,
                    showConfirmButton: false,
                    allowOutsideClick: false,
                    color: "#000",
                    background: "#fff",
                    backdrop: `
                        rgba(0,0,123,0.4)
                        url("img/hackerman-programming.gif")
                        center top
                        no-repeat
                    `,
                    customClass: {
                        backdrop: 'swal2-backdrop-color',
                        popup: 'swal2-popup-color'
                    }
                }).then(() => {
                    form.submit();
                    window.location.reload(); // Reload the page after successful submission
                });
            })
            .catch(error => {
                console.error('Error!', error.message);
                // Show an error alert if there's an issue with sending the message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Something went wrong! Please try again later.',
                    customClass: {
                        backdrop: 'swal2-backdrop-color',
                        popup: 'swal2-popup-color'
                    }
                });
            });
    });
});