document.addEventListener('DOMContentLoaded', () => {
    // 1. Cart Drawer Logic
    const cartTrigger = document.getElementById('cartTrigger');
    const cartDrawer = document.getElementById('cartDrawer');
    const closeCart = document.getElementById('closeCart');

    cartTrigger.addEventListener('click', () => {
        cartDrawer.classList.add('active');
    });

    closeCart.addEventListener('click', () => {
        cartDrawer.classList.remove('active');
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!cartDrawer.contains(e.target) && !cartTrigger.contains(e.target) && cartDrawer.classList.contains('active')) {
            cartDrawer.classList.remove('active');
        }
    });

    // 2. Category Pill Interaction
    const pills = document.querySelectorAll('.category-pill');
    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // Subtle feedback
            pill.style.transform = 'scale(0.95)';
            setTimeout(() => pill.style.transform = 'scale(1)', 100);
        });
    });

    // 3. Add to Cart Feedback
    const addButtons = document.querySelectorAll('.add-btn');
    const cartCount = document.querySelector('.cart-count');

    addButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent card click

            // Animate count
            let currentCount = parseInt(cartCount.textContent);
            cartCount.textContent = currentCount + 1;

            cartCount.style.transform = 'scale(1.5)';
            cartCount.style.background = '#10B981'; // Turn green momentarily

            // Visual pulse on the button
            btn.innerHTML = '<i class="fas fa-check"></i>';
            btn.style.background = '#10B981';

            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
                cartCount.style.background = '#FF4D00';
                btn.innerHTML = '<i class="fas fa-plus"></i>';
                btn.style.background = '#FF4D00';
            }, 1000);
        });
    });

    // 4. Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const revealItems = document.querySelectorAll('.food-card, .section-header, .category-pill');
    revealItems.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.05}s`;
        observer.observe(el);
    });
});
