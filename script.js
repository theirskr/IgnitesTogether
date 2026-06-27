document.addEventListener("DOMContentLoaded", () => {
    const donateBtn = document.getElementById("initiate-donation");
    const modal = document.getElementById("donation-modal");
    const closeModal = document.querySelector(".close-modal");
    
    const matrixCards = document.querySelectorAll(".matrix-card");
    const childInput = document.getElementById("child-count");
    const stepDecrement = document.getElementById("step-decrement");
    const stepIncrement = document.getElementById("step-increment");
    
    const displayType = document.getElementById("summary-type-display");
    const displayPrice = document.getElementById("summary-price-display");
    
    const confirmBtn = document.getElementById("confirm-investment");
    const counterAmount = document.getElementById("counter-amount");

    let currentRate = 40; // Default base value for food track
    let currentTypeName = "Food Support";

    // Open Premium Dynamic Operational Matrix Modal
    donateBtn.addEventListener("click", () => {
        modal.classList.add("active");
    });

    // Close Interface Matrix
    closeModal.addEventListener("click", () => {
        modal.classList.remove("active");
    });

    // Recalculation Calculation Processing Framework Engine
    const updateCalculatedValuation = () => {
        let count = parseInt(childInput.value) || 1;
        
        // Boundaries safety clamps
        if(count < 1) { count = 1; childInput.value = 1; }
        
        let calculatedTotal = currentRate * count;
        
        displayType.innerText = `${currentTypeName} (${count} ${count === 1 ? 'Child' : 'Children'})`;
        displayPrice.innerText = "₹" + calculatedTotal.toLocaleString('en-IN');
    };

    // Category Grid Item Selections Selection Mechanics
    matrixCards.forEach(card => {
        card.addEventListener("click", (e) => {
            matrixCards.forEach(c => c.classList.remove("active"));
            
            const targetedCard = e.currentTarget;
            targetedCard.classList.add("active");
            
            currentRate = parseInt(targetedCard.getAttribute("data-rate"));
            currentTypeName = targetedCard.getAttribute("data-type") + " Support";
            
            updateCalculatedValuation();
        });
    });

    // Custom Input Stepper Interface Control Loops
    stepIncrement.addEventListener("click", () => {
        childInput.value = parseInt(childInput.value) + 1;
        updateCalculatedValuation();
    });

    stepDecrement.addEventListener("click", () => {
        if(parseInt(childInput.value) > 1) {
            childInput.value = parseInt(childInput.value) - 1;
            updateCalculatedValuation();
        }
    });

    childInput.addEventListener("input", updateCalculatedValuation);

    // --- INTEGRATED RAZORPAY CHECKOUT WINDOW GATEWAY ---
    confirmBtn.addEventListener("click", () => {
        let finalCount = parseInt(childInput.value) || 1;
        let finalPriceRupees = currentRate * finalCount;
        
        // CRITICAL: Razorpay reads values in Paise (₹1 = 100 Paise)
        let finalPricePaise = finalPriceRupees * 100; 
        
        confirmBtn.innerText = "Initializing Checkout Window...";
        
        // Configuration options payload for Razorpay standard interface
        const options = {
            "key": "rzp_live_T6WIHSZyoRE3Ao", // Paste your rzp_test_... key here
            "amount": finalPricePaise,
            "currency": "INR",
            "name": "IgnitesTogether",
            "description": `Allocation: ${currentTypeName} for ${finalCount} child(ren)`,
            "image": "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEimBP0I5W8xfowFM0o4p0pKv_9KehFHRwUSshcmvWQlI_RjPLmIWTbqTqiNxITFb_NaaRtS9esfsPrNE-CpwgvnOnaUVyq7KnSDaiZSPBkZnJbh1s_CbsWKklv2TZvC-O_1eYa3xq4LOdkJC6z0WAXKx7aKN4iBPF-Cmf3YUcTQaWgQZnGP-AekX1FJLvw/s750/1000118781.jpg",
            "handler": function (response) {
                // This block runs dynamically if payment succeeds
                modal.classList.remove("active");
                confirmBtn.innerText = "Authorize Capital Pool Transfer";
                
                alert(`Payment Successful!\n\nPayment ID: ${response.razorpay_payment_id}\nAllocated Strategy: ${currentTypeName}\nAmount Settled: ₹${finalPriceRupees}`);
                
                // Increment display ledger tracking global platform metrics safely on UI
                let currentGlobalAmt = parseInt(counterAmount.innerText.replace(/[₹,]/g, ''));
                let newGlobalTotal = currentGlobalAmt + finalPriceRupees;
                counterAmount.innerText = "₹" + newGlobalTotal.toLocaleString('en-IN');
            },
            "prefill": {
                "name": "Syndicate Contributor",
                "email": "contributor@example.com"
            },
            "theme": {
                "color": "#0d0d11" // Dark theme profile match
            },
            "modal": {
                "ondismiss": function() {
                    // Reset button text if user exits the modal without paying
                    confirmBtn.innerText = "Authorize Capital Pool Transfer";
                }
            }
        };

        const rzp1 = new Razorpay(options);
        
        // Handle checkout generation failures gracefully
        rzp1.on('payment.failed', function (response){
            alert(`Payment Failed: ${response.error.description}`);
            confirmBtn.innerText = "Authorize Capital Pool Transfer";
        });

        // Open the premium hosted popup layer over your screen
        rzp1.open();
    });
});
