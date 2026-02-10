export function renderConsultationModal() {
    const modalHTML = `
    <div id="consultationModal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden px-4">
        <div class="bg-white rounded-2xl shadow-2xl max-w-[70%] w-full p-8 relative max-h-[90vh] overflow-y-auto">
            <button id="closeModal" class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition">
                <i class="fas fa-times text-2xl"></i>
            </button>

            <div class="text-center mb-6">
                <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-calendar-check text-[#1671b9] text-2xl"></i>
                </div>
                <h2 class="text-2xl font-bold text-gray-900 mb-2">Request a Consultation</h2>
                <p class="text-gray-600">Fill out the form below and we'll get back to you soon</p>
            </div>

            <form id="consultationForm" class="space-y-4">
                <div>
                    <label for="consultantName" class="block text-sm font-medium text-gray-700 mb-2">Full me *</label>
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
                    <label for="consultantCountry" class="block text-sm font-medium text-gray-700 mb-2">Country *</label>
                    <select id="consultantCountry" name="country" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                        <option value="">Select country...</option>
                        <option value="United States">United States</option>
                        <option value="Canada">Canada</option>
                        <option value="United Kingdom">United Kingdom</option>
                        <option value="Australia">Australia</option>
                        <option value="India">India</option>
                        <option value="Germany">Germany</option>
                        <option value="France">France</option>
                        <option value="Japan">Japan</option>
                        <option value="China">China</option>
                        <option value="Brazil">Brazil</option>
                        <option value="Mexico">Mexico</option>
                        <option value="South Africa">South Africa</option>
                        <option value="United Arab Emirates">United Arab Emirates</option>
                        <option value="Singapore">Singapore</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label for="consultantTimezone" class="block text-sm font-medium text-gray-700 mb-2">Timezone *</label>
                    <select id="consultantTimezone" name="timezone" required
                        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition">
                        <option value="">Select timezone...</option>
                        <option value="UTC-12:00">UTC-12:00 (Baker Island Time)</option>
                        <option value="UTC-11:00">UTC-11:00 (Hawaii-Aleutian Time)</option>
                        <option value="UTC-10:00">UTC-10:00 (Hawaii Standard Time)</option>
                        <option value="UTC-09:30">UTC-09:30 (Marquesas Time)</option>
                        <option value="UTC-09:00">UTC-09:00 (Alaska Time)</option>
                        <option value="UTC-08:00">UTC-08:00 (Pacific Time - US & Canada)</option>
                        <option value="UTC-07:00">UTC-07:00 (Mountain Time - US & Canada)</option>
                        <option value="UTC-06:00">UTC-06:00 (Central Time - US & Canada)</option>
                        <option value="UTC-05:00">UTC-05:00 (Eastern Time - US & Canada)</option>
                        <option value="UTC-04:00">UTC-04:00 (Atlantic Time - Canada)</option>
                        <option value="UTC-03:30">UTC-03:30 (Newfoundland Time)</option>
                        <option value="UTC-03:00">UTC-03:00 (Argentina, Brazil)</option>
                        <option value="UTC-02:00">UTC-02:00 (Mid-Atlantic Time)</option>
                        <option value="UTC-01:00">UTC-01:00 (Cape Verde Time)</option>
                        <option value="UTC+00:00">UTC+00:00 (Greenwich Mean Time)</option>
                        <option value="UTC+01:00">UTC+01:00 (Central European Time)</option>
                        <option value="UTC+02:00">UTC+02:00 (Eastern European Time)</option>
                        <option value="UTC+03:00">UTC+03:00 (Moscow Time, East Africa Time)</option>
                        <option value="UTC+03:30">UTC+03:30 (Iran Standard Time)</option>
                        <option value="UTC+04:00">UTC+04:00 (Gulf Standard Time)</option>
                        <option value="UTC+04:30">UTC+04:30 (Afghanistan Time)</option>
                        <option value="UTC+05:00">UTC+05:00 (Pakistan Standard Time)</option>
                        <option value="UTC+05:30">UTC+05:30 (India Standard Time)</option>
                        <option value="UTC+05:45">UTC+05:45 (Nepal Time)</option>
                        <option value="UTC+06:00">UTC+06:00 (Bangladesh Standard Time)</option>
                        <option value="UTC+06:30">UTC+06:30 (Myanmar Time)</option>
                        <option value="UTC+07:00">UTC+07:00 (Indochina Time)</option>
                        <option value="UTC+08:00">UTC+08:00 (China Standard Time, Singapore)</option>
                        <option value="UTC+08:45">UTC+08:45 (Australian Central Western Time)</option>
                        <option value="UTC+09:00">UTC+09:00 (Japan Standard Time, Korea Standard Time)</option>
                        <option value="UTC+09:30">UTC+09:30 (Australian Central Standard Time)</option>
                        <option value="UTC+10:00">UTC+10:00 (Australian Eastern Standard Time)</option>
                        <option value="UTC+10:30">UTC+10:30 (Lord Howe Standard Time)</option>
                        <option value="UTC+11:00">UTC+11:00 (Solomon Islands Time)</option>
                        <option value="UTC+12:00">UTC+12:00 (New Zealand Standard Time)</option>
                        <option value="UTC+12:45">UTC+12:45 (Chatham Standard Time)</option>
                        <option value="UTC+13:00">UTC+13:00 (Tonga Time)</option>
                        <option value="UTC+14:00">UTC+14:00 (Line Islands Time)</option>
                    </select>
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

                <div class="flex justify-center my-4">
                    <div id="recaptcha-container"></div>
                </div>

                <div id="formMessage" class="hidden p-4 rounded-lg"></div>

                <button type="submit"
                    class="w-full bg-[rgb(1,122,188)] hover:bg-[rgb(1,132,198)] text-white font-semibold py-3 rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                    <span id="submitText">Submit Request</span>
                    <span id="submitLoader" class="hidden">
                        <i class="fas fa-spinner fa-spin mr-2"></i>Submitting...
                    </span>
                </button>
            </form>
        </div>
    </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
    initConsultationModal();
    
    // Expose openModal function globally so header.js and other scripts can use it
    window.openConsultationModal = function() {
        const modal = document.getElementById('consultationModal');
        const consultationForm = document.getElementById('consultationForm');
        const formMessage = document.getElementById('formMessage');
        
        if (modal) {
            modal.classList.remove('hidden');
            modal.classList.add('flex', 'items-center', 'justify-center');
            document.body.style.overflow = 'hidden';
            
            if (consultationForm) consultationForm.reset();
            if (formMessage) formMessage.classList.add('hidden');
            
            // Render or reset reCAPTCHA when modal opens
            const recaptchaContainer = document.getElementById('recaptcha-container');
            if (recaptchaContainer) {
                // Clear any existing CAPTCHA
                recaptchaContainer.innerHTML = '';
                
                // Wait a bit for the modal to be fully visible, then render CAPTCHA
                setTimeout(() => {
                    const renderCaptcha = () => {
                        if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                            try {
                                const widgetId = grecaptcha.render('recaptcha-container', {
                                    'sitekey': '6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq',
                                    'theme': 'light',
                                    'size': 'normal'
                                });
                                // Store widget ID globally so form submission can access it
                                window.recaptchaWidgetId = widgetId;
                                if (recaptchaContainer) {
                                    recaptchaContainer.setAttribute('data-widget-id', widgetId);
                                }
                            } catch (error) {
                                console.error('reCAPTCHA render error:', error);
                                // If render fails, try using the data attribute method
                                const container = document.getElementById('recaptcha-container');
                                if (container) {
                                    container.innerHTML = '<div class="g-recaptcha" data-sitekey="6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq"></div>';
                                    if (grecaptcha.ready) {
                                    grecaptcha.ready(() => {
                                        const widgetId = grecaptcha.render(container.querySelector('.g-recaptcha'), {
                                            'sitekey': '6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq'
                                        });
                                        window.recaptchaWidgetId = widgetId;
                                        if (container) {
                                            container.setAttribute('data-widget-id', widgetId);
                                        }
                                    });
                                    }
                                }
                            }
                        }
                    };
                    
                    if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                        renderCaptcha();
                    } else {
                        // If grecaptcha is not loaded yet, wait and try again
                        const checkInterval = setInterval(() => {
                            if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                                renderCaptcha();
                                clearInterval(checkInterval);
                            }
                        }, 100);
                        
                        // Stop checking after 5 seconds
                        setTimeout(() => clearInterval(checkInterval), 5000);
                    }
                }, 100);
            }
        }
    };
}

function initConsultationModal() {
    const modal = document.getElementById('consultationModal');
    const closeModalBtn = document.getElementById('closeModal');
    const consultationForm = document.getElementById('consultationForm');
    const formMessage = document.getElementById('formMessage');
    const submitText = document.getElementById('submitText');
    const submitLoader = document.getElementById('submitLoader');
    let recaptchaWidgetId = null;
    
    // Store widget ID globally so it can be accessed from anywhere
    window.recaptchaWidgetId = null;

    function openModal() {
        modal.classList.remove('hidden');
        modal.classList.add('flex', 'items-center', 'justify-center');
        document.body.style.overflow = 'hidden';
        consultationForm.reset();
        formMessage.classList.add('hidden');
        
        // Render or reset reCAPTCHA when modal opens
        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (recaptchaContainer) {
            // Clear any existing CAPTCHA
            recaptchaContainer.innerHTML = '';
            
            // Wait a bit for the modal to be fully visible, then render CAPTCHA
            setTimeout(() => {
                const renderCaptcha = () => {
                    if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                        try {
                            recaptchaWidgetId = grecaptcha.render('recaptcha-container', {
                                'sitekey': '6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq',
                                'theme': 'light',
                                'size': 'normal'
                            });
                            window.recaptchaWidgetId = recaptchaWidgetId;
                        } catch (error) {
                            console.error('reCAPTCHA render error:', error);
                            // If render fails, try using the data attribute method
                            const container = document.getElementById('recaptcha-container');
                            if (container) {
                                container.innerHTML = '<div class="g-recaptcha" data-sitekey="6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq"></div>';
                                if (grecaptcha.ready) {
                                    grecaptcha.ready(() => {
                                        recaptchaWidgetId = grecaptcha.render(container.querySelector('.g-recaptcha'), {
                                            'sitekey': '6Le_7mYsAAAAAIu6ZjQ_2nugpTbkIfdQ0O6RBcfq'
                                        });
                                    });
                                }
                            }
                        }
                    }
                };
                
                if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                    renderCaptcha();
                } else {
                    // If grecaptcha is not loaded yet, wait and try again
                    const checkInterval = setInterval(() => {
                        if (typeof grecaptcha !== 'undefined' && grecaptcha.render) {
                            renderCaptcha();
                            clearInterval(checkInterval);
                        }
                    }, 100);
                    
                    // Stop checking after 5 seconds
                    setTimeout(() => clearInterval(checkInterval), 5000);
                }
            }, 100);
        }
    }

    function closeModal() {
        modal.classList.add('hidden');
        modal.classList.remove('flex', 'items-center', 'justify-center');
        document.body.style.overflow = '';
        // Clear CAPTCHA container when modal closes
        const recaptchaContainer = document.getElementById('recaptcha-container');
        if (recaptchaContainer) {
            recaptchaContainer.innerHTML = '';
        }
        recaptchaWidgetId = null;
        window.recaptchaWidgetId = null;
    }

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

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    if (consultationForm) {
        consultationForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const submitButton = consultationForm.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitText.classList.add('hidden');
            submitLoader.classList.remove('hidden');
            formMessage.classList.add('hidden');

            // Get reCAPTCHA response
            let recaptchaResponse = '';
            if (typeof grecaptcha !== 'undefined' && grecaptcha.getResponse) {
                // Try to get widget ID from local variable or global variable
                const widgetId = recaptchaWidgetId !== null ? recaptchaWidgetId : (window.recaptchaWidgetId !== null ? window.recaptchaWidgetId : null);
                if (widgetId !== null) {
                    recaptchaResponse = grecaptcha.getResponse(widgetId);
                } else {
                    // Fallback: try to get response without widget ID
                    recaptchaResponse = grecaptcha.getResponse();
                }
            }
            
            if (!recaptchaResponse) {
                formMessage.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
                formMessage.textContent = 'Please complete the CAPTCHA verification.';
                formMessage.classList.remove('hidden');
                submitButton.disabled = false;
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
                return;
            }

            const formData = {
                name: document.getElementById('consultantName').value,
                email: document.getElementById('consultantEmail').value,
                phone: document.getElementById('consultantPhone').value,
                country: document.getElementById('consultantCountry').value,
                timezone: document.getElementById('consultantTimezone').value,
                availability: document.getElementById('consultantAvailability').value,
                recaptcha_response: recaptchaResponse
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
                    const widgetIdToReset = recaptchaWidgetId !== null ? recaptchaWidgetId : (window.recaptchaWidgetId !== null ? window.recaptchaWidgetId : null);
                    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset && widgetIdToReset !== null) {
                        grecaptcha.reset(widgetIdToReset);
                    }

                    setTimeout(() => {
                        closeModal();
                    }, 3000);
                } else {
                    formMessage.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
                    formMessage.textContent = result.message || 'Something went wrong. Please try again.';
                    formMessage.classList.remove('hidden');
                    const widgetIdToReset = recaptchaWidgetId !== null ? recaptchaWidgetId : (window.recaptchaWidgetId !== null ? window.recaptchaWidgetId : null);
                    if (typeof grecaptcha !== 'undefined' && grecaptcha.reset && widgetIdToReset !== null) {
                        grecaptcha.reset(widgetIdToReset);
                    }
                }
            } catch (error) {
                formMessage.className = 'p-4 rounded-lg bg-red-100 text-red-800 border border-red-300';
                formMessage.textContent = 'Network error. Please check your connection and try again.';
                formMessage.classList.remove('hidden');
                const widgetIdToReset = recaptchaWidgetId !== null ? recaptchaWidgetId : (window.recaptchaWidgetId !== null ? window.recaptchaWidgetId : null);
                if (typeof grecaptcha !== 'undefined' && grecaptcha.reset && widgetIdToReset !== null) {
                    grecaptcha.reset(widgetIdToReset);
                }
                console.error('Error:', error);
            } finally {
                submitButton.disabled = false;
                submitText.classList.remove('hidden');
                submitLoader.classList.add('hidden');
            }
        });
    }
}

