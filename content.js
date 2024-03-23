function fixTwitter() {
  const targetNode = document.querySelector('div[data-testid="cellInnerDiv"]');
  const config = { attributes: true, childList: true, subtree: true };
  const callback = function (mutationsList) {
    for (let mutation of mutationsList) {
      if (mutation.type === "childList") {
        const moreRepliesButton = targetNode.querySelector(
          "span.css-1qaijid.r-bcqeeo.r-qvutc0.r-poiln3"
        );
        if (
          moreRepliesButton &&
          moreRepliesButton.textContent.includes("Show more replies")
        ) {
          moreRepliesButton.textContent = "See other responses";
        }
      }
    }
  };
  const observer = new MutationObserver(callback);
  if (targetNode) {
    observer.observe(targetNode, config);
  }
  const primaryPostButton = document.querySelector('a[aria-label="Post"]');
  if (primaryPostButton) {
    const spans = primaryPostButton.querySelectorAll("span");
    const lastSpan = spans[spans.length - 1];

    if (lastSpan && lastSpan.textContent === "Post") {
      lastSpan.textContent = "Tweet";
    }
  }

  const secondaryPostButton = document.querySelector(
    'div[data-testid="tweetButton"]'
  );
  if (secondaryPostButton) {
    const spanTestId = secondaryPostButton.querySelector("span > span");
    if (spanTestId && spanTestId.textContent.includes("Post")) {
      spanTestId.textContent = "Tweet";
    }
  }

  const tertiaryPostButton = document.querySelector(
    'div[data-testid="tweetButtonInline"]'
  );
  if (tertiaryPostButton) {
    const spanId = tertiaryPostButton.querySelector("span > span");
    if (spanId && spanId.textContent.includes("Post")) {
      spanId.textContent = "Tweet";
    }
  }

  const homeLink = document.querySelector('a[aria-label="X"]');
  if (homeLink) {
    const svgElement = homeLink.querySelector("svg");
    if (svgElement) {
      const Larry = document.createElement("img");
      Larry.src = chrome.runtime.getURL("icon.png");
      Larry.alt = "Larry, the Twitter Bird";
      Larry.style.width = "24px";
      Larry.style.height = "24px";
      svgElement.replaceWith(Larry);
    }
  }

  const grok = document.querySelector('a[aria-label="Grok"]');
  const premium = document.querySelector('a[aria-label="Premium"]');
  const subToPrem = document.querySelector(
    'aside[aria-label="Subscribe to Premium"]'
  );

  grok.style.display = "None";
  premium.style.display = "None";
  subToPrem.style.display = "None";

  const originalTitle = document.title;
  const titleParts = originalTitle.split(" / ");
  if (titleParts.length === 2) {
    document.title = titleParts[0] + " / Twitter";
  }

  if (
    window.location.href.includes("twitter.com/i/grok") ||
    window.location.href.includes("x.com/i/grok")
  ) {
    window.location.replace("https://twitter.com");
  }
}

function replaceX() {
  const walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_TEXT,
    null,
    false
  );
  let node;
  const xcorp = /X Corp\./gi;
  const xlogo = /\u{1D54F}/gu;

  const replies = /Show more replies/gi;
  while ((node = walker.nextNode())) {
    if (node.nodeValue.match(replies)) {
      node.nodeValue = node.nodeValue.replace(replies, "See porn bots, gifs and racism");
    } else {
      node.nodeValue = node.nodeValue
        .replace(xcorp, "Twitter")
        .replace(xlogo, "Twitter");
    }
  }
}
setInterval(fixTwitter, 10);
setInterval(replaceX, 100);
