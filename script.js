document.addEventListener('DOMContentLoaded', () => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login if not logged in
    } else {
        document.getElementById('welcome-message').textContent = `Welcome, ${currentUser.name}!`;

        const amountInput = document.getElementById('amount');
        const descriptionInput = document.getElementById('description');
        const typeSelect = document.getElementById('type');
        const addBtn = document.getElementById('add-btn');
        const resetBtn = document.getElementById('reset-btn');
        const totalIncome = document.getElementById('total-income');
        const totalExpense = document.getElementById('total-expense');
        const balance = document.getElementById('balance');
        const transactionList = document.getElementById('transaction-list');

        let income = 0;
        let expense = 0;

        // Function to add income or expense
        addBtn.addEventListener('click', () => {
            const amount = parseFloat(amountInput.value);
            const description = descriptionInput.value;
            const type = typeSelect.value;

            if (!amount || !description) {
                alert("Please enter both amount and description.");
                return;
            }

            if (type === 'income') {
                income += amount;
            } else if (type === 'expense') {
                expense += amount;
            }

            // Create transaction list item
            const li = document.createElement('li');
            li.classList.add('list-group-item');
            li.innerHTML = `${type.charAt(0).toUpperCase() + type.slice(1)}: <span style="color: ${type === 'income' ? 'green' : 'red'};">${amount.toFixed(2)}</span> - ${description}`;

            // Append to transaction list
            transactionList.appendChild(li);

            // Update summary
            totalIncome.textContent = income.toFixed(2);
            totalExpense.textContent = expense.toFixed(2);
            balance.textContent = (income - expense).toFixed(2);

            // Clear inputs
            amountInput.value = '';
            descriptionInput.value = '';
            typeSelect.value = 'income';
        });

        // Reset button functionality
        resetBtn.addEventListener('click', () => {
            amountInput.value = '';
            descriptionInput.value = '';
            typeSelect.value = 'income';
            totalIncome.textContent = '0';
            totalExpense.textContent = '0';
            balance.textContent = '0';
            transactionList.innerHTML = ''; // Clear the transaction list
        });
    }
});
