
class Investment {
    constructor(movieName, imgSrc, price, dailyInterest, daysRemaining) {
        this.movieName = movieName;
        this.imgSrc = imgSrc;
        this.price = price;
        this.dailyInterest = dailyInterest;
        this.daysRemaining = daysRemaining;
    }

    startEarning() {
        const interval = setInterval(() => {
            if (this.daysRemaining > 0) {
                User.balance += this.dailyInterest;
                this.daysRemaining -= 1;
                alert("interest added")
                this.updateStorage();

                if (this.daysRemaining === 0) {
                    clearInterval(interval);
                }
            }
        }, 3000); // 24 hours in milliseconds
    }

    updateStorage() {
        let investments = JSON.parse(localStorage.getItem('investments')) || [];
        let updatedInvestments = investments.map(product => {
            if (product.movieName === this.movieName) {
                return this;
            }
            return product;
        });
        localStorage.setItem('investments', JSON.stringify(updatedInvestments));
    }
}

class User {
    static balance = 10000000; // Example balance, can be dynamic later

    static purchase(product) {
        if (this.balance >= product.price) {
            this.balance -= product.price;
            alert("Successful purchase!");

            // Store investment
            let investments = JSON.parse(localStorage.getItem('investments')) || [];
            investments.push(product);
            localStorage.setItem('investments', JSON.stringify(investments));

            // Start earning interest
            product.startEarning();
        } else {
            alert("Insufficient balance.");
        }
    }

    static getBalance() {
        return this.balance;
    }
}

function loadInvestments() {
    return JSON.parse(localStorage.getItem('investments')) || [];
}
