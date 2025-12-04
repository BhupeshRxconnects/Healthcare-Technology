// consultationModal.js
export function renderConsultationModal() {
    const modalHTML = `
    <!-- Consultation Modal -->
    <div id="consultationModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden px-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <!-- Close Button -->
            <button id="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                <i class="fas fa-times text-2xl"></i>
            </button>

            <!-- Modal Header -->
            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-calendar-check text-blue-600 text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Request a Consultation</h2>
                <p class="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>

            <!-- Modal Form -->
            <form id="consultationForm" class="space-y-4">
                <div>
                    <label for="consultantName" class="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input type="text" id="consultantName" name="name" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="John Doe">
                </div>

                <div>
                    <label for="consultantEmail" class="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                    <input type="email" id="consultantEmail" name="email" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="john.doe@example.com">
                </div>

                <div>
                    <label for="consultantPhone" class="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                    <input type="tel" id="consultantPhone" name="phone" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                        placeholder="+1 (555) 123-4567">
                </div>

                <div>
                    <label for="consultantAvailability" class="block text-sm font-medium text-gray-700 mb-2">Preferred Availability *</label>
                    <select id="consultantAvailability" name="availability" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                        <option value="">Select availability...</option>
                        <option value="Morning (9 AM - 12 PM)">Morning (9 AM - 12 PM)</option>
                        <option value="Afternoon (12 PM - 5 PM)">Afternoon (12 PM - 5 PM)</option>
                        <option value="Evening (5 PM - 8 PM)">Evening (5 PM - 8 PM)</option>
                        <option value="Flexible - Any time">Flexible - Any time</option>
                    </select>
                </div>

                <!-- Success/Error Messages -->
                <div id="formMessage" class="hidden p-4 rounded-lg"></div>

                <!-- Submit Button -->
                <button type="submit"
                    class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <span id="submitText">Submit Request</span>
                    <span id="submitLoader" class="hidden">
                        <i class="fas fa-spinner fa-spin mr-2"></i>Submitting...
                    </span>
                </button>
            </form>
        </div>
    </div>
    `;

    // Insert modal HTML before closing body tag
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Initialize modal functionality
    initConsultationModal();
}

function initConsultationModal() {
    const modal = document.getElementById('consultationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const consultationForm = document.getElementById('consultationForm');
    const formMessage = document.getElementById('formMessage');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');

    // Open modal function
    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'items-center', 'justify-center');
        document.body.style.overflow = 'hidden';
        // Reset form
        consultationForm.reset();
        formMessage.classList.add('hidden');
    }

    // Close modal function
    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');
        document.body.style.overflow = '';
    }

    // Event delegation for opening modal - all consultation buttons/links
    document.addEventListener('click', function(e) {
        const element = e.target.closest('a, button');
        if (element) {
            const text = element.textContent.trim();
            if (text.includes('Consultation') || (text.includes('Schedule') && text.includes('Free'))) {
                e.preventDefault();
                openModal();
            }
        }
    });

    // Close modal on close button click
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // Close modal on backdrop click
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    // Form submission
    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = consultationForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitText.classList.add('hidden');
            submitLoader.classList.remove('hidden');
            formMessage.classList.add('hidden');

            const formData = {
                name: document.getElementById('consultantName').value,
                email: document.getElementById('consultantEmail').value,
                phone: document.getElementById('consultantPhone').value,
                availability: document.getElementById('consultantAvailability').value
            };

            try {
                const response = await fetch('api/consultation.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData)
                });

                const result = await response.json();

                if (response.ok && result.success) {
                    formMessage.className = 'p-4 rounded-lg bg-green-100 text-green-800 border border-green-300';
                    formMessage.textContent = result.message || 'Thank you! We\'ll get back to you soon.';
                    formMessage.classList.remove('hidden');
                    consultationForm.reset();

                    // Auto close modal after 3 seconds
                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                } else {
                    formMessage.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
                    formMessage.textContent = result.message || 'Something went wrong. Please try again.';
                    formMessage.classList.remove('hidden');
                }
            } catch (error) {
                formMessage.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
                formMessage.textContent = 'Network error. Please check your connection and try again.';
                formMessage.classList.remove('hidden');
                console.error('Error:', error);
            } finally {
                submitButton.disabled = false;
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
            }
        });
    }
}

