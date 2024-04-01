// Create heading
const heading = document.createElement('h1');
heading.textContent = 'Ticket Booking System';
document.body.appendChild(heading);

// Create form
const form = document.createElement('form');
document.body.appendChild(form);

// Number of tickets input
const numTicketsLabel = document.createElement('label');
numTicketsLabel.textContent = 'Number of Tickets:';
form.appendChild(numTicketsLabel);

const numTicketsInput = document.createElement('input');
numTicketsInput.type = 'number';
numTicketsInput.min = '1';
numTicketsInput.value = '1';
form.appendChild(numTicketsInput);

// Name input
const nameLabel = document.createElement('label');
nameLabel.textContent = 'Name:';
form.appendChild(nameLabel);

const nameInput = document.createElement('input');
nameInput.type = 'text';
form.appendChild(nameInput);

// Email input
const emailLabel = document.createElement('label');
emailLabel.textContent = 'Email:';
form.appendChild(emailLabel);

const emailInput = document.createElement('input');
emailInput.type = 'email';
form.appendChild(emailInput);

// Submit button
const submitButton = document.createElement('button');
submitButton.type = 'button';
submitButton.textContent = 'Book Tickets';
form.appendChild(submitButton);

// Booking result div
const bookingResult = document.createElement('div');
document.body.appendChild(bookingResult);

// Event listener for submit button
submitButton.addEventListener('click', function() {
    const numTickets = parseInt(numTicketsInput.value);
    const name = nameInput.value;
    const email = emailInput.value;

    const bookingResultText = `Booking successful for ${numTickets} ticket(s) for ${name} (${email}).`;
    bookingResult.textContent = bookingResultText;
});
