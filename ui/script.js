// script.js
$(document).ready(function() {
    function display(bool) {
        if (bool) {
            $("#.report-form").fadeIn("slow");
        } else {
            $("#.report-form").fadeOut("slow");
        }
    }
    display(false);

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true);
            } else {
                display(false);
            }
        }

        $("#error").text(item.error);
    });

    $(".close-button").click(function() {
        display(false);
        $.post(`https://${GetParentResourceName()}/close`);
    });

    document.onkeyup = function(data) {
        if (data.which == 27) {
            display(false);
            $.post(`https://${GetParentResourceName()}/close`);
        }
    };

    function submitReport() {
        const reporterName = $("#reporter-name").val();
        const reportTitle = $("#report-title").val();
        const reportDescription = $("#report-description").val();
        display(false);
        $.post(`https://${GetParentResourceName()}/close`);
        
        const data = {
            embeds: [
                {
                    title: 'New Report Submission',
                    color: 2899536,
                    fields: [
                        {
                            name: 'Reporter',
                            value: reporterName,
                        },
                        {
                            name: 'Title',
                            value: reportTitle,
                        },
                        {
                            name: 'Description',
                            value: reportDescription,
                        },
                    ],
                },
            ],
        };

        fetch('https://discord.com/api/webhooks/1193675873526743040/dhlyLDoX1fBjj7c4s6TBHFmDCoTnakK1zhHETHlHcS1KEHhl410h3XcNdHbyikVVMSaV', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            alert("Report submitted successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Failed to submit report. Please try again.");
        });
    }
});
