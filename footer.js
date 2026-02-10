export function renderFooter() {
    const footerHTML = `
    <style>
        .footer-link-animated {
            position: relative;
            display: inline-block;
        }
        .footer-link-animated::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -2px;
            left: 0;
            background-color: currentColor;
            transition: width 0.3s ease-in-out;
        }
        .footer-link-animated:hover::after {
            width: 100%;
        }
    </style>
    <footer class="bg-[#e8f1ff]  text-black-90 px-6 sm:px-10 lg:px-20 py-10">
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-black-400">
</div>
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    <div class="flex items-center space-x-2 mb-4">
                        <img src="./assets/logo.png" class="logo" alt="">
                    </div>
                    <p class="text-black-400 mb-4 max-w-md">
                        Advancing healthcare through intelligent digital innovation. Enterprise-grade solutions for
                        modern healthcare challenges.
                    </p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-black-400 hover:text-gray transition-colors">
                            <i class="fab fa-linkedin text-xl"></i>
                        </a>
                        <a href="#" class="text-black-400 hover:text-gray transition-colors">
                            <i class="fa-brands fa-x-twitter"></i>
                        </a>
                        <a href="#" class="text-black-400 hover:text-gray transition-colors">
                            <i class="fab fa-facebook text-xl"></i>
                        </a>
                    </div>
                </div>

                <div class="md:col-span-2">
                    <h3 class="font-semibold text-lg mb-4">Portfolio</h3>
                    <ul class="space-y-2 text-black-400">
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Enterprise Healthcare Software Solutions</a></li>
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Custom Web & Mobile Applications</a></li>
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Intelligent Automation & Workflow Optimization</a></li>
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Secure Data Infrastructure & Compliance Systems</a></li>
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Advanced Analytics & Performance Reporting</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold text-lg mb-4">Company</h3>
                    <ul class="space-y-2 text-black-400">
                        <li><a href="about.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>About Us</a></li>
                        <li><a href="service.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Services</a></li>
                        <li><a href="portfolio.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Portfolio</a></li>
                        <li><a href="contact.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Contact</a></li>
                        <li><a href="partners.html" class="footer-link-animated hover:text-gray transition-colors flex items-center"><span class="mr-2">•</span>Partners</a></li>
                    </ul>
                </div>
            </div>

            <div class="border-t border-gray-800 mt-8 pt-8 text-center text-black-400">
                <p>&copy; Powered by MY CARE RX CONNECITONS. All rights reserved.</p>
            </div>
        </div>
    </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

