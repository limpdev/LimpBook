// TradingView Widget Component
class TradingViewWidget {
    constructor(options = {}) {
        this.defaultOptions = {
            colorTheme: "dark",
            isTransparent: false,
            locale: "en",
            width: "100%",
            height: "100px",
        };
        this.options = { ...this.defaultOptions, ...options };
    }

    // Generate widget HTML for a given ticker
    generate(ticker) {
        const widgetId = `tradingview-${ticker.toLowerCase()}-${Date.now()}`;

        return `
<div class="tradingview-widget-container" style="margin: 10px 0;">
    <div id="${widgetId}" class="tradingview-widget-container__widget"></div>
    <div class="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span class="blue-text">Track all markets on TradingView</span>
        </a>
    </div>
    <script type="text/javascript">
        (function() {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-single-quote.js';
            script.async = true;
            script.innerHTML = JSON.stringify({
                "symbol": "${ticker}",
                "colorTheme": "${this.options.colorTheme}",
                "isTransparent": ${this.options.isTransparent},
                "locale": "${this.options.locale}",
                "width": "${this.options.width}",
                "height": "${this.options.height}"
            });
            document.getElementById('${widgetId}').appendChild(script);
        })();
    </script>
</div>`;
    }

    // Markdown transformer function
    static transformMarkdown(markdown, options = {}) {
        const widget = new TradingViewWidget(options);

        // Replace [$TICKER] patterns with TradingView widgets
        return markdown.replace(/\[\$([A-Z]{1,5})\]/g, (match, ticker) => {
            return widget.generate(ticker);
        });
    }
}

// Usage Examples:

// 1. Direct widget generation
const widget = new TradingViewWidget();
console.log(widget.generate("JPM"));

// 2. Markdown transformation
const markdown = `
# Financial Analysis Report

Here's the performance of JPM: [$JPM]

And here's Apple: [$AAPL]

Tesla has been volatile: [$TSLA]
`;

const transformedHtml = TradingViewWidget.transformMarkdown(markdown, {
    colorTheme: "light",
    height: "120px",
});

console.log(transformedHtml);

// 3. Custom options per widget (advanced usage)
class AdvancedTradingViewWidget extends TradingViewWidget {
    static transformMarkdownAdvanced(markdown) {
        return markdown.replace(/\[\$([A-Z]{1,5})(?:\|([^}]+))?\]/g, (match, ticker, options) => {
            const widgetOptions = {};

            if (options) {
                // Parse options like: theme=light,height=150px
                options.split(",").forEach((option) => {
                    const [key, value] = option.split("=");
                    if (key && value) {
                        widgetOptions[key.trim()] = value.trim();
                    }
                });
            }

            const widget = new TradingViewWidget(widgetOptions);
            return widget.generate(ticker);
        });
    }
}

// Advanced usage: [$JPM|theme=light,height=150px]
const advancedMarkdown = `Check out [$JPM|colorTheme=light,height=150px] performance.`;
console.log(AdvancedTradingViewWidget.transformMarkdownAdvanced(advancedMarkdown));
