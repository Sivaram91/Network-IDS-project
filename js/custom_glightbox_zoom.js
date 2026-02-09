// Add mouse wheel zoom to GLightbox
document.addEventListener('DOMContentLoaded', function() {
    let currentZoom = 1;
    let currentX = 0;
    let currentY = 0;

    // Listen for GLightbox to open
    document.addEventListener('click', function(e) {
        if (e.target.closest('a.glightbox, img')) {
            setTimeout(initializeZoom, 300); // Wait for GLightbox to render
        }
    });

    function initializeZoom() {
        const container = document.querySelector('.gslide.current .gslide-image');
        if (!container) return;

        const img = container.querySelector('img');
        if (!img) return;

        // Reset zoom when slide opens
        currentZoom = 1;
        currentX = 0;
        currentY = 0;

        // Add wheel event listener
        container.addEventListener('wheel', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const delta = e.deltaY > 0 ? -0.1 : 0.1;
            currentZoom = Math.min(Math.max(1, currentZoom + delta), 5); // Min 1x, Max 5x

            img.style.transformOrigin = 'center center';
            img.style.transform = `scale(${currentZoom}) translate(${currentX}px, ${currentY}px)`;
        }, { passive: false });

        // Optional: Add drag to pan when zoomed
        let isDragging = false;
        let startX, startY;

        img.addEventListener('mousedown', function(e) {
            if (currentZoom > 1) {
                isDragging = true;
                startX = e.clientX - currentX;
                startY = e.clientY - currentY;
                e.preventDefault();
            }
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                currentX = e.clientX - startX;
                currentY = e.clientY - startY;
                img.style.transform = `scale(${currentZoom}) translate(${currentX}px, ${currentY}px)`;
            }
        });

        document.addEventListener('mouseup', function() {
            isDragging = false;
        });
    }

    // Reset zoom when closing or changing slides
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.removedNodes.length > 0) {
                currentZoom = 1;
                currentX = 0;
                currentY = 0;
            }
        });
    });

    const body = document.body;
    observer.observe(body, { childList: true });
});