// Tailwind Configuration
tailwind.config = {
    theme: {
        extend: {
            colors: {
                black: '#0b0b0b',
                primary: '#facc15', // Yellow
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        }
    }
}

// Initialize Lucide Icons
lucide.createIcons();

// Mobile Menu Toggle
const mobileBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
}

// Close mobile menu on click
document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (mobileMenu) mobileMenu.classList.add('hidden');
    });
});

// Sticky Navbar Style Change on Scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (navbar) {
        if (window.scrollY > 20) {
            navbar.classList.add('shadow-lg', 'border-b', 'border-gray-800');
        } else {
            navbar.classList.remove('shadow-lg', 'border-b', 'border-gray-800');
        }
    }
});

// Scroll Reveal Animations
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Hero background brightens on scroll
const heroBgImg = document.getElementById('heroBgImg');
const heroSection = document.querySelector('section');
window.addEventListener('scroll', () => {
    if (heroBgImg && heroSection) {
        const heroHeight = heroSection.offsetHeight;
        const scrolled = Math.min(window.scrollY / heroHeight, 1);
        // Opacity goes from 0.35 (top) to 0.6 (bottom of hero)
        heroBgImg.style.opacity = 0.35 + (scrolled * 0.25);
    }
});

// Dynamic Car Select Logic
const carData = {
    "Audi": ["A3", "A4", "A6", "A8", "Q2", "Q3", "Q5", "Q7", "Q8", "RS5", "e-tron"],
    "BMW": ["2 Series", "3 Series", "5 Series", "6 Series", "7 Series", "X1", "X3", "X4", "X5", "X6", "X7", "Z4"],
    "Chevrolet": ["Aveo", "Beat", "Captiva", "Cruze", "Enjoy", "Optra", "Sail", "Spark", "Tavera"],
    "Citroen": ["Basalt", "C3", "C3 Aircross", "C5 Aircross"],
    "Datsun": ["GO", "GO+", "redi-GO"],
    "Fiat": ["Linea", "Punto", "Punto Evo", "Urban Cross"],
    "Ford": ["Aspire", "EcoSport", "Endeavour", "Fiesta", "Figo", "Freestyle", "Mustang"],
    "Honda": ["Accord", "Amaze", "BR-V", "Brio", "CR-V", "City", "Civic", "Elevate", "Jazz", "Mobilio", "WR-V"],
    "Hyundai": ["Alcazar", "Aura", "Creta", "Elite i20", "Eon", "Exter", "Grand i10", "Grand i10 Nios", "Santro", "Tucson", "Venue", "Verna", "Xcent", "i10", "i20"],
    "Isuzu": ["D-Max", "MU-X", "V-Cross"],
    "Jaguar": ["F-Pace", "F-Type", "XE", "XF", "XJ"],
    "Jeep": ["Compass", "Grand Cherokee", "Meridian", "Wrangler"],
    "Kia": ["Carens", "Carnival", "EV6", "Seltos", "Sonet", "Syros"],
    "Land Rover": ["Defender", "Discovery", "Discovery Sport", "Range Rover", "Range Rover Evoque", "Range Rover Sport", "Range Rover Velar"],
    "MG": ["Astor", "Comet EV", "Gloster", "Hector", "Hector Plus", "Windsor EV", "ZS EV"],
    "Mahindra": ["Alturas G4", "Bolero", "Bolero Neo", "KUV100", "Marazzo", "NuvoSport", "Quanto", "Scorpio", "Scorpio-N", "TUV300", "Thar", "Verito", "XUV300", "XUV400", "XUV500", "XUV700", "Xylo"],
    "Maruti Suzuki": ["Alto", "Baleno", "Brezza", "Celerio", "Ciaz", "Dzire", "Ertiga", "Fronx", "Grand Vitara", "Ignis", "Jimny", "S-Presso", "Swift", "Wagon R", "XL6"],
    "Mercedes-Benz": ["A-Class", "C-Class", "E-Class", "G-Class", "GLA", "GLB", "GLC", "GLE", "GLS", "S-Class"],
    "Nissan": ["Evalia", "Kicks", "Magnite", "Micra", "Sunny", "Terrano", "X-Trail"],
    "Porsche": ["911", "Cayenne", "Macan", "Panamera", "Taycan"],
    "Renault": ["Captur", "Duster", "Fluence", "Kiger", "Kwid", "Lodgy", "Scala", "Triber"],
    "Skoda": ["Fabia", "Kodiaq", "Kushaq", "Laura", "Octavia", "Rapid", "Slavia", "Superb", "Yeti"],
    "Tata Motors": ["Altroz", "Aria", "Bolt", "Curvv", "Harrier", "Hexa", "Indica", "Indigo", "Nano", "Nexon", "Punch", "Safari", "Tiago", "Tigor", "Zest"],
    "Toyota": ["Camry", "Corolla Altis", "Etios", "Etios Liva", "Fortuner", "Glanza", "Innova Crysta", "Innova Hycross", "Rumion", "Urban Cruiser", "Urban Cruiser Hyryder", "Yaris"],
    "Volkswagen": ["Ameo", "Jetta", "Passat", "Phideon", "Polo", "Taigun", "Tiguan", "Vento", "Virtus"],
    "Volvo": ["S60", "S90", "V90", "XC40", "XC60", "XC90"],
    "Other": ["Other Model"]
};

const brandInput = document.getElementById('carBrand');
const brandList = document.getElementById('brandList');
const brandDropdownContainer = document.getElementById('brandDropdownContainer');
const modelSelect = document.getElementById('carModel');
const yearSelect = document.getElementById('carYear');

if (brandInput && brandList && brandDropdownContainer && modelSelect && yearSelect) {
    let brandNames = Object.keys(carData).filter(b => b !== "Other").sort();
    brandNames.push("Other");

    function triggerModelUpdate(brandValue) {
        modelSelect.innerHTML = '<option value="" disabled selected>Model</option>';
        if (brandValue && carData[brandValue]) {
            carData[brandValue].sort().forEach(model => {
                let option = document.createElement('option');
                option.value = model;
                option.textContent = model;
                modelSelect.appendChild(option);
            });
            modelSelect.disabled = false;
            modelSelect.classList.remove('text-gray-500');
            modelSelect.classList.add('text-white');
        } else {
            modelSelect.disabled = true;
            modelSelect.classList.add('text-gray-500');
            modelSelect.classList.remove('text-white');
        }
    }

    function renderBrandList(filterText = '') {
        brandList.innerHTML = '';
        const filtered = brandNames.filter(b => b.toLowerCase().includes(filterText.toLowerCase()));
        
        if (filtered.length === 0) {
            brandList.innerHTML = '<div class="px-4 py-3 text-gray-500 text-sm">No brands found</div>';
            return;
        }
        
        filtered.forEach(brand => {
            const div = document.createElement('div');
            div.className = 'px-4 py-3 text-gray-300 hover:bg-primary hover:text-black cursor-pointer transition text-sm font-medium border-b border-gray-800 last:border-0';
            div.textContent = brand;
            div.addEventListener('click', () => {
                brandInput.value = brand;
                brandList.classList.add('hidden');
                triggerModelUpdate(brand);
            });
            brandList.appendChild(div);
        });
    }

    brandInput.addEventListener('focus', () => {
        brandList.classList.remove('hidden');
        renderBrandList(brandInput.value);
    });

    brandInput.addEventListener('input', (e) => {
        brandList.classList.remove('hidden');
        renderBrandList(e.target.value);
        
        if (!carData[e.target.value]) {
            triggerModelUpdate('');
        } else {
            triggerModelUpdate(e.target.value);
        }
    });

    document.addEventListener('click', (e) => {
        if (!brandDropdownContainer.contains(e.target)) {
            brandList.classList.add('hidden');
            if (brandInput.value && !carData[brandInput.value]) {
                brandInput.value = '';
                triggerModelUpdate('');
            }
        }
    });

    // Populate Years (2005 to current year)
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 2005; y--) {
        let option = document.createElement('option');
        option.value = y;
        option.textContent = y;
        yearSelect.appendChild(option);
    }
}

// Form Validation & Submission
const form = document.getElementById('bookingForm');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validate fields
        const fields = ['name', 'phone', 'carBrand', 'carModel', 'carYear', 'location', 'date'];
        
        fields.forEach(field => {
            const input = document.getElementById(field);
            const error = document.getElementById(field + 'Error');
            
            if (input && !input.value.trim()) {
                if (error) error.classList.remove('hidden');
                input.classList.add('border-red-500');
                isValid = false;
            } else if (input) {
                if (error) error.classList.add('hidden');
                input.classList.remove('border-red-500');
            }
        });

        // Extra: 10-digit phone number validation
        const phoneInput = document.getElementById('phone');
        const phoneError = document.getElementById('phoneError');
        if (phoneInput) {
            const rawPhone = phoneInput.value.replace(/[\s\-\(\)]/g, ''); // strip spaces, dashes, parens
            const cleanPhone = rawPhone.replace(/^(\+91|91|0)/, ''); // strip +91 / 91 / 0 prefix
            if (!/^\d{10}$/.test(cleanPhone)) {
                if (phoneError) {
                    phoneError.textContent = 'Please enter a valid 10-digit mobile number';
                    phoneError.classList.remove('hidden');
                }
                phoneInput.classList.add('border-red-500');
                isValid = false;
            }
        }

        if (isValid) {
            // Redirect to WhatsApp
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const brand = document.getElementById('carBrand').value;
            const model = document.getElementById('carModel').value;
            const year = document.getElementById('carYear').value;
            const location = document.getElementById('location').value;
            const date = document.getElementById('date').value;

            const message = `Hello Autonest! I want to book an inspection.\n\n*Details:*\n- Name: ${name}\n- Phone: ${phone}\n- Car: ${brand} ${model} (${year})\n- Location: ${location}\n- Preferred Date: ${date}`;
            
            const waNumber = "918179378163"; 
            const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;

            // Show success message and redirect
            const successMsg = document.getElementById('successMsg');
            if (successMsg) {
                successMsg.classList.remove('hidden');
                successMsg.classList.replace('text-red-400', 'text-green-400');
                successMsg.classList.replace('bg-red-500/10', 'bg-green-500/10');
                successMsg.classList.replace('border-red-500/20', 'border-green-500/20');
                successMsg.innerText = "Redirecting to WhatsApp to complete your booking...";
            }
            
            setTimeout(() => {
                window.open(waUrl, '_blank');
                form.reset();
                setTimeout(() => {
                    if (successMsg) successMsg.classList.add('hidden');
                }, 3000);
            }, 1000);
        }
    });
}
