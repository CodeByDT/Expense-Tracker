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

        let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

        // Function to update the summary and display transactions
        const updateSummary = () => {
            let income = 0;
            let expense = 0;

            transactionList.innerHTML = '';

            transactions.forEach(transaction => {
                if (transaction.type === 'income') {
                    income += transaction.amount;
                } else if (transaction.type === 'expense') {
                    expense += transaction.amount;
                }

                // Create transaction list item
                const li = document.createElement('li');
                li.classList.add('list-group-item');
                li.innerHTML = `${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}: 
                    <span style="color: ${transaction.type === 'income' ? 'green' : 'red'};">${transaction.amount.toFixed(2)}</span> - ${transaction.description}`;

                // Append to transaction list
                transactionList.appendChild(li);
            });

            // Update totals
            totalIncome.textContent = income.toFixed(2);
            totalExpense.textContent = expense.toFixed(2);
            balance.textContent = (income - expense).toFixed(2);
        };

        // Load existing transactions and update summary
        updateSummary();

        // Function to add income or expense
        addBtn.addEventListener('click', () => {
            const amount = parseFloat(amountInput.value);
            const description = descriptionInput.value;
            const type = typeSelect.value;

            if (!amount || !description) {
                alert("Please enter both amount and description.");
                return;
            }

            // Add transaction to the array
            const transaction = { type, amount, description };
            transactions.push(transaction);

            // Save to localStorage
            localStorage.setItem('transactions', JSON.stringify(transactions));

            // Update summary and clear inputs
            updateSummary();
            amountInput.value = '';
            descriptionInput.value = '';
            typeSelect.value = 'income';
        });

        // Reset button functionality
        resetBtn.addEventListener('click', () => {
            // Clear transactions
            transactions = [];

            // Save to localStorage
            localStorage.setItem('transactions', JSON.stringify(transactions));

            // Update summary
            updateSummary();

            // Clear inputs
            amountInput.value = '';
            descriptionInput.value = '';
            typeSelect.value = 'income';
        });
    }
});
