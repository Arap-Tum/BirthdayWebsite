 console.log("i am in ")
import {sampleData} from "./data.js"


        // Load data from JSON file
        async function loadBirthdayData() {
            try {
                
                return sampleData;
            } catch (error) {
                console.error('Error loading data:', error);
                return null;
            }
        }

     

        // Initialize the page with data
        document.addEventListener('DOMContentLoaded', async () => {
            const data = await loadBirthdayData();
            if (data) {
                populatePage(data);
            } else {
                console.log("no data")
            }
        });

        function populatePage(data) {
            // Update title
            document.title = `Happy Birthday, ${data.name}!`;
            
            // Hero Section
            document.getElementById('hero-title').textContent = `🎉 ${data.heroMessage}`;
            document.getElementById('hero-subtitle').textContent = `Celebrating ${data.age} years of joy and love`;
            
            if (data.backgroundImage) {
                document.getElementById('hero').style.backgroundImage = `url('${data.backgroundImage}')`;
            }
            
            // Gallery Section
            const gallery = document.getElementById('gallery');
            // data.photos.forEach(photo => {
            //     const img = document.createElement('img');
            //     img.src = photo;
            //     img.alt = 'Memories';
            //     gallery.appendChild(img);
            // });

            const lightbox = document.getElementById('lightbox');
            const lightboxImg = document.getElementById('lightbox-img');
            const closeBtn = document.getElementById('close-btn');

            // When a gallery image is clicked
            data.photos.forEach(photo => {
                const img = document.createElement('img');
                img.src = photo;
                img.alt = 'Memory';
                img.addEventListener('click', () => {
                    lightboxImg.src = photo;
                    lightbox.style.display = 'flex';
                });
                gallery.appendChild(img);
            });

            // Close the lightbox when X is clicked
            closeBtn.addEventListener('click', () => {
                lightbox.style.display = 'none';
            });


            
            // Tribute Section
            document.getElementById('tribute-text').textContent = data.tributeMessage;
            
            // Verse Section
            document.getElementById('verse-text').textContent = data.verseText;
            document.getElementById('verse-reference').textContent = data.verseReference;
            
     
            // Closing Section
            document.getElementById('closing-message').textContent = data.closingMessage;
            updateCountdown();
            setInterval(updateCountdown, 1000);
            
            // Footer
            document.getElementById('footer-name').textContent = data.name;
        }
        const targetDate = new Date("May 10, 2025 00:00:00").getTime();
            const countdown = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance <= 0) {
                clearInterval(countdown);
                document.getElementById("countdown").innerHTML = "🎉 It's the day!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((distance / (1000 * 60)) % 60);
            const seconds = Math.floor((distance / 1000) % 60);

            document.getElementById("countdown").innerHTML = 
                `${days}d ${hours}h ${minutes}m ${seconds}s left`;
            }, 1000);


   
       
        // Popup show/hide logic
        document.getElementById('open-form').addEventListener('click', function (e) {
          e.preventDefault();
          document.getElementById('form-overlay').style.display = 'flex';
        });
      
        document.getElementById('close-form').addEventListener('click', function () {
          document.getElementById('form-overlay').style.display = 'none';
        });
      
        document.getElementById('form-overlay').addEventListener('click', function (e) {
          if (e.target === this) {
            this.style.display = 'none';
          }
        });
 
      
            const btn = document.getElementById('button');
            const successPopup = document.getElementById('success-popup');

            document.getElementById('form')
            .addEventListener('submit', function(event) {
            event.preventDefault();

            btn.value = 'Sending...';

            const serviceID = 'default_service';
            const templateID = 'template_2al3rx3';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                btn.value = 'Send Email';
                document.getElementById('form-overlay').style.display = 'none';
                successPopup.classList.add('show');
                successPopup.classList.remove('hidden')
                // alert('Sent!');

                setTimeout(() => {
                    successPopup.classList.remove('show');
                    successPopup.classList.add('hidden');
                }, 4000);
                }, (err) => {
                btn.value = 'Send Email';
                alert(JSON.stringify(err));
                });
            });

            