export function renderHeader() {
    const headerHTML = `
<header class="sticky top-0 z-50  bg-[#e8f1ff]  backdrop-blur-md">
        <nav class="container mx-auto px-6 sm:px-10 lg:px-20 py-4">
            <div class="flex justify-between items-center">

                <a href="index.html" class="flex items-center">
                    <img src="./assets/logo.png" class="h-16 w-auto" alt="Logo">
                </a>

                <div class="hidden md:flex space-x-8">
                    <a href="index.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Home</a>
                    <a href="about.html" class="text-gray-700 hover:text-primary font-medium transition-colors">About</a>
                    <a href="service.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Service</a>
                    <a href="portfolio.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Portfolio</a>
                    <a href="contact.html" class="text-gray-700 hover:text-primary font-medium transition-colors">Contact</a>
                </div>

                <div class="flex items-center space-x-4">
                    <button id="requestDemoBtn" class="hidden md:block bg-[rgb(1,122,188)] text-white px-6 py-2 rounded-lg font-medium hover:bg-[rgb(1,132,198)] transition-colors">
                        Request Demo
                    </button>

                    <a href="partners.html" class="hidden md:block border-2 border-primary text-primary px-6 py-2 rounded-lg font-medium 
                        hover:bg-primary hover:text-white transition-colors">
                        Partners
                    </a>

                    <button id="menuBtn" class="md:hidden text-gray-700">
                        <i class="fas fa-bars text-2xl"></i>
                    </button>
                </div>
            </div>

            <div id="mobileMenu" class="hidden flex-col space-y-4 mt-4 md:hidden">
                <a href="index.html" class="block text-gray-700 hover:text-primary font-medium">Home</a>
                <a href="about.html" class="block text-gray-700 hover:text-primary font-medium">About</a>
                <a href="service.html" class="block text-gray-700 hover:text-primary font-medium">Service</a>
                <a href="portfolio.html" class="block text-gray-700 hover:text-primary font-medium">Portfolio</a>
                <a href="contact.html" class="block text-gray-700 hover:text-primary font-medium">Contact</a>

                <button id="requestDemoBtnMobile" class="w-full text-[#1671b9] text-white px-6 py-2 rounded-lg font-medium hover:bg-[rgb(1,132,198)] transition-colors">
                    Request Demo
                </button>

                <a href="./partners.html">
                    <button class="w-full mt-2 bg-primary text-white px-6 py-2 rounded-lg font-medium hover:bg-secondary transition-colors">
                        Partners
                    </button>
                </a>
            </div>
        </nav>
    </header>
    `;

    document.body.insertAdjacentHTML("afterbegin", headerHTML);

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");

    if (menuBtn) {
        menuBtn.addEventListener("click", () => {
            mobileMenu.classList.toggle("hidden");
        });
    }

    function openConsultationModal() {
        const modal = document.getElementById('consultationModal');
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'items-center', 'justify-center');
            document.body.style.overflow = 'hidden';
        }
    }

    const requestDemoBtn = document.getElementById('requestDemoBtn');
    const requestDemoBtnMobile = document.getElementById('requestDemoBtnMobile');

    if (requestDemoBtn) {
        requestDemoBtn.addEventListener('click', function(e) {
            e.preventDefault();
            openConsultationModal();
        });
    }

    if (requestDemoBtnMobile) {
        requestDemoBtnMobile.addEventListener('click', function(e) {
            e.preventDefault();
            openConsultationModal();
        });
    }
}
