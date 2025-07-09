// data.js
// This file contains all the dummy data used across different pages.

const products = [
    { id: 1, name: 'Vintage Bicycle', category: 'Vehicles', price: 15000, city: 'Mumbai', state: 'Maharashtra', description: 'Well-maintained vintage bicycle, perfect for city rides. Features include a comfortable seat, working gears, and classic design.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Vintage+Bicycle', sellerId: 'seller123' },
    { id: 2, name: 'Antique Wooden Chair', category: 'Furniture', price: 8000, city: 'Delhi', state: 'Delhi', description: 'Hand-carved antique chair, excellent condition. A unique piece to add charm to your living room or study.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Antique+Chair', sellerId: 'seller124' },
    { id: 3, name: 'Smartphone (Used)', category: 'Electronics', price: 12000, city: 'Bangalore', state: 'Karnataka', description: 'iPhone 12, 128GB, good condition, minor scratches. Comes with original box and charger.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Used+Smartphone', sellerId: 'seller123' },
    { id: 4, name: 'Designer Dress', category: 'Fashion', price: 5000, city: 'Chennai', state: 'Tamil Nadu', description: 'Worn once, perfect for parties. Elegant design with intricate embroidery. Size: M.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Designer+Dress', sellerId: 'seller125' },
    { id: 5, name: 'Old Books Collection', category: 'Books', price: 2000, city: 'Kolkata', state: 'West Bengal', description: 'Collection of classic novels, good for collectors. Includes works by Dickens, Austen, and Tolstoy.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Old+Books', sellerId: 'seller126' },
    { id: 6, name: 'Gaming PC', category: 'Electronics', price: 75000, city: 'Hyderabad', state: 'Telangana', description: 'High-end gaming PC, RTX 3080, i9 processor. Custom built with liquid cooling for optimal performance.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Gaming+PC', sellerId: 'seller127' },
    { id: 7, name: 'Motorcycle Helmet', category: 'Vehicles', price: 3500, city: 'Pune', state: 'Maharashtra', description: 'Brand new, never used, full face helmet. DOT certified, size L.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Helmet', sellerId: 'seller128' },
    { id: 8, name: 'Sofa Set', category: 'Furniture', price: 25000, city: 'Ahmedabad', state: 'Gujarat', description: '3+2 seater sofa set, comfortable and stylish. Upholstered in durable fabric, perfect for family use.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Sofa+Set', sellerId: 'seller129' },
    { id: 9, name: 'Digital Camera', category: 'Electronics', price: 30000, city: 'Jaipur', state: 'Rajasthan', description: 'Canon DSLR, with two lenses, excellent for photography. Comes with a carrying bag and extra battery.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Digital+Camera', sellerId: 'seller130' },
    { id: 10, name: 'Wedding Lehenga', category: 'Fashion', price: 40000, city: 'Lucknow', state: 'Uttar Pradesh', description: 'Beautifully embroidered wedding lehenga, worn once. Perfect for a grand occasion. Size: Free.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Wedding+Lehenga', sellerId: 'seller131' },
    { id: 11, name: 'Smart TV', category: 'Electronics', price: 45000, city: 'Mumbai', state: 'Maharashtra', description: '55-inch 4K Smart TV, excellent picture quality. Built-in streaming apps.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Smart+TV', sellerId: 'seller123' },
    { id: 12, name: 'Dining Table Set', category: 'Furniture', price: 18000, city: 'Delhi', state: 'Delhi', description: 'Wooden dining table with 4 chairs. Good condition, ideal for small families.', imageUrl: 'https://placehold.co/400x250/E0E0E0/333333?text=Dining+Set', sellerId: 'seller124' },
];

const faqs = [
    { question: 'How do I post an ad?', answer: 'You can post an ad by clicking on the "Sell" button in the navigation bar and filling out the required details. Make sure to add clear photos and a detailed description for better visibility.' },
    { question: 'How can I contact a seller?', answer: 'On the product details page, you will find a "Chat with Seller" button. Clicking this will open a live chat window where you can communicate directly with the seller in real-time.' },
    { question: 'What are the payment options?', answer: 'Currently, we support direct communication between buyer and seller for payment arrangements. We do not handle payments directly, ensuring flexibility for both parties. Always meet in a public place for exchanges.' },
    { question: 'How do I filter products?', answer: 'On the "Products" page, use the filter options on the left sidebar to refine your search. You can filter by category, price range, city, state, or even search for specific product names.' },
    { question: 'Is there a return policy?', answer: 'Returns are subject to agreement between the buyer and seller. We recommend discussing the return policy and product condition thoroughly before finalizing the purchase to avoid any misunderstandings.' },
    { question: 'How to report a suspicious listing?', answer: 'You can report a suspicious listing by clicking the "Report" button on the product details page. Alternatively, you can contact our support team directly with the listing ID and details of your concern.' },
    { question: 'How to create an account?', answer: 'Click on the "Sign Up" or "My Account" button in the navigation bar and follow the instructions to register. It\'s a quick and simple process.' },
    { question: 'Can I edit my ad after posting?', answer: 'Yes, you can edit your ad from your "My Ads" section after logging in. You can update details, change photos, or modify the price at any time.' },
    { question: 'What if I forget my password?', answer: 'Click on "Forgot Password" on the login page and follow the instructions to reset it. A link will be sent to your registered email address.' },
    { question: 'Are there any charges for posting ads?', answer: 'Basic ad posting is free on our platform. However, premium features like promoting your ad to reach more buyers might incur small charges.' }
];

// Global variables for chat, accessible across files
let currentSellerId = null;
const chatMessages = JSON.parse(localStorage.getItem('chatMessages')) || {};

// Cart functionality
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || []; // Load cart from local storage

// Expose data globally
window.products = products;
window.faqs = faqs;
window.currentSellerId = currentSellerId;
window.chatMessages = chatMessages;
window.cartItems = cartItems;

console.log('data.js loaded. window.products is now defined:', !!window.products);
