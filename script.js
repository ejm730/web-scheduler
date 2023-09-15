$(document).ready(function() {
    // Display current day at the top of the calendar
    const today = new Date();
    $('#currentDay').text(today.toDateString());

    // Get the current hour
    const currentHour = today.getHours();

    $('.time-block').each(function() {
        const blockHour = parseInt($(this).attr('data-hour'));

        // Adjust classes based on relation to the current hour
        if (blockHour < currentHour) {
            $(this).addClass('past').removeClass('present future');
        } else if (blockHour === currentHour) {
            $(this).addClass('present').removeClass('past future');
        } else {
            $(this).addClass('future').removeClass('past present');
        }
    });

    $('.saveBtn').on('click', function() {
        const hour = $(this).parent().attr('data-hour');
        const event = $(this).siblings('.description').text().trim();
    
        // Only save if event is not empty
        if (event) {
            localStorage.setItem(hour, event);
        }
    });
    $('.deleteBtn').on('click', function() {
        const hour = $(this).parent().attr('data-hour');
        $(this).siblings('.description').text(""); // Clear the text area
        localStorage.removeItem(hour); // Remove the item from local storage
    });

    // Retrieve from local storage on load
$('.time-block').each(function() {
    const blockHour = $(this).attr('data-hour');
    const event = localStorage.getItem(blockHour);

    if (event !== null) { // Check if the event is not null instead of just truthy
        $(this).find('.description').text(event);
    }
});
});