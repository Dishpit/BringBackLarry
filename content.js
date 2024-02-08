function changeButtonText() {
    const postButton = document.querySelector('a[aria-label="Post"]');
        if (postButton) {
            const spans = postButton.querySelectorAll('span');
            const lastSpan = spans[spans.length - 1];

            if (lastSpan && lastSpan.textContent === 'Post') {
                lastSpan.textContent = 'Tweet';
            }
        }
}
setInterval(changeButtonText, 1000);
