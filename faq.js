// faq.js (FAQ Logic)

/**
 * Searches FAQs based on user input and displays them.
 * This function is called on faq.html.
 */
function searchFAQs() {
    const searchTerm = document.getElementById('faqSearchInput')?.value.toLowerCase();
    const faqAccordion = document.getElementById('faq-accordion');
    if (!faqAccordion) return;

    faqAccordion.innerHTML = ''; // Clear existing FAQs

    const filteredFaqs = window.faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
    );

    if (filteredFaqs.length === 0) {
        faqAccordion.innerHTML = '<div class="alert alert-warning text-center" role="alert">No FAQs found matching your search.</div>';
        return;
    }

    filteredFaqs.forEach((faq, index) => {
        const faqItem = `
            <div class="accordion-item mb-2 rounded-3 shadow-sm">
                <h2 class="accordion-header" id="heading${index}">
                    <button class="accordion-button rounded-pill fw-bold text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                        ${faq.question}
                    </button>
                </h2>
                <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="heading${index}" data-bs-parent="#faq-accordion">
                    <div class="accordion-body text-secondary">
                        ${faq.answer}
                    </div>
                </div>
            </div>
        `;
        faqAccordion.innerHTML += faqItem;
    });
}

// Expose function to the global scope
window.searchFAQs = searchFAQs;
