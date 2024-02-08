function fixBranding() {
    const primaryPostButton = document.querySelector('a[aria-label="Post"]');
        if (primaryPostButton) {
            const spans = primaryPostButton.querySelectorAll('span');
            const lastSpan = spans[spans.length - 1];

            if (lastSpan && lastSpan.textContent === 'Post') {
                lastSpan.textContent = 'Tweet';
            }
        }

    const secondaryPostButton = document.querySelector('div[data-testid="tweetButton"]');
    if (secondaryPostButton) {
        const spanTestId = secondaryPostButton.querySelector('span > span');
        if (spanTestId && spanTestId.textContent.includes('Post')) {
            spanTestId.textContent = 'Tweet';
        }
    }

    const homeLink = document.querySelector('a[aria-label="X"]');
    if (homeLink) {
        const svgElement = homeLink.querySelector('svg');
        if (svgElement) {
            const Larry = document.createElement('img');
            Larry.src = chrome.runtime.getURL('icon.png');
            Larry.alt = 'Larry, the Twitter Bird';
            Larry.style.width = '24px';
            Larry.style.height = '24px';
            svgElement.replaceWith(Larry);
        }
    }
}
setInterval(fixBranding, 1000);
