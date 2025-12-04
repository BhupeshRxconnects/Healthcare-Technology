// footer.js
export function renderFooter() {
    const footerHTML = `
    <!-- Footer -->
    <footer class="bg-[#e8f1ff]  text-black-90 px-6 sm:px-10 lg:px-20 py-10">
                <div class="border-t border-gray-800 mt-8 pt-8 text-center text-black-400">
</div>
        <div class="container mx-auto px-4">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div class="md:col-span-2">
                    <div class="flex items-center space-x-2 mb-4">
                        <img src="./assets/my_care_logo.svg" class="logo" alt="">
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

                <div>
                    <h3 class="font-semibold text-lg mb-4">Portfolio</h3>
                    <ul class="space-y-2 text-black-400">
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Enterprise Healthcare Software Solutions</a></li>
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Custom Web & Mobile Applications</a></li>
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Intelligent Automation & Workflow Optimization</a></li>
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Secure Data Infrastructure & Compliance Systems</a></li>
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Advanced Analytics & Performance Reporting</a></li>
                    </ul>
                </div>

                <div>
                    <h3 class="font-semibold text-lg mb-4">Company</h3>
                    <ul class="space-y-2 text-black-400">
                        <li><a href="about.html" class="hover:text-gray transition-colors">About Us</a></li>
                        <li><a href="service.html" class="hover:text-gray transition-colors">Services</a></li>
                        <li><a href="portfolio.html" class="hover:text-gray transition-colors">Portfolio</a></li>
                        <li><a href="contact.html" class="hover:text-gray transition-colors">Contact</a></li>
                        <li><a href="partners.html" class="hover:text-gray transition-colors">Partners</a></li>
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

