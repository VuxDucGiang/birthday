$(document).ready(function () {
    var envelope = $('#envelope');
    var btn_open = $("#open");
    var btn_reset = $("#reset");
    var btn_surprise = document.getElementById('surpriseButton'); // Lấy button "Điều bất ngờ"

    envelope.click(function () {
        open();
    });
    btn_open.click(function () {
        open();
    });
    btn_reset.click(function () {
        close();
    });

    // Thêm sự kiện click cho button "Điều bất ngờ"
    btn_surprise.addEventListener('click', function () {
        shootHeartImages();

        // Hiển thị button điều hướng sau khi nhấn "Điều bất ngờ"
        const navigateButton = document.getElementById('navigateButton');
        navigateButton.style.display = 'block';
    });

    // Thêm sự kiện click cho button điều hướng
    const navigateButton = document.getElementById('navigateButton');
    navigateButton.addEventListener('click', function () {
        window.location.href = 'galaxy.html'; // Điều hướng sang trang galaxy.html
    });

    function open() {
        envelope.addClass("open").removeClass("close");
        document.getElementById('envelope').classList.add('open');

        // Thay đổi nội dung thư thành một bức ảnh
        const letterContent = document.querySelector('.letter');
        letterContent.innerHTML = '<img src="./img/LoveLetter.jpg" alt="Bức ảnh bí mật" class="animate" style="max-width: 100%; border-radius: 10px;">';

        // Thêm hiệu ứng di chuyển sau khi ảnh được thêm
        setTimeout(() => {
            const img = letterContent.querySelector('img');
            img.classList.add('animate');

            // Sau 3 giây, phóng ảnh lên trên
            setTimeout(() => {
                img.classList.add('fly-away');

                // Sau khi phóng lên, quay lại màn hình với kích thước lớn hơn
                setTimeout(() => {
                    img.classList.remove('fly-away');
                    img.classList.add('return');
                    
                    // Thêm class để ẩn pocket
                    document.querySelector('.pocket').classList.add('hidden');
                    document.querySelector('.flap').classList.add('hidden');

                    // Hiển thị button "Điều bất ngờ"
                    const btnSurprise = document.getElementById('surpriseButton');
                    btnSurprise.style.display = 'block';
                }, 1000);
            }, 2000);
        }, 100);
    }

    function close() {
        envelope.addClass("close").removeClass("open");
        document.getElementById('envelope').classList.remove('open');

        // Xóa nội dung thư khi đóng phong bì
        const letterContent = document.querySelector('.letter');
        letterContent.innerHTML = '';
        
        // Hiển thị lại pocket khi đóng
        document.querySelector('.pocket').classList.remove('hidden');
        document.querySelector('.flap').classList.remove('hidden');

        // Xóa tất cả ảnh trái tim khi đóng
        removeAllHeartImages();
    }

    // Function bắn ra 20 ảnh hình trái tim
    function createHeartPhotoCentered(idx, total) {
        const photo = document.createElement('img');
        photo.src = photoUrls[idx % photoUrls.length];
        photo.className = 'photo';
        document.body.appendChild(photo);

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const t = Math.PI * 2 * (idx / total);

        // Tỉ lệ scale trái tim nhỏ lại trên màn hình nhỏ
        let scale = 22;
        if (window.innerWidth <= 480) {
            scale = 14;
        }

        const targetX = scale * 18 * Math.pow(Math.sin(t), 3);
        const targetY = -scale * (14 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

        photo.style.left = centerX + 'px';
        photo.style.top = centerY + 'px';
        photo.style.opacity = '1';
        photo.style.pointerEvents = 'auto';
        photo.style.position = 'absolute';
        photo.style.transform = 'translate(-50%, -50%)';
        photo.style.zIndex = '9999';

        let progress = 0;
        const steps = 100;

        // Thu nhỏ các tấm ảnh lại
        photo.style.width = '120px';
        photo.style.height = '120px';

        function animate() {
            if (progress <= steps) {
                const curX = centerX + (targetX * progress / steps);
                const curY = centerY + (targetY * progress / steps);
                photo.style.left = curX + 'px';
                photo.style.top = curY + 'px';
                progress++;
                requestAnimationFrame(animate);
            } else {
                photo.style.left = (centerX + targetX) + 'px';
                photo.style.top = (centerY + targetY) + 'px';
            }
        }
        animate();
    }

    function spawnHeartPhotosCentered() {
        const totalPhotos = 20; // Số lượng ảnh trái tim;
        for (let i = 0; i < totalPhotos; i++) {
            setTimeout(() => createHeartPhotoCentered(i, totalPhotos), i * 70);
        }
    }

    // Placeholder array for photoUrls
    const photoUrls = [
        './img/emnhi/pic1.jpg',
        './img/emnhi/pic2.jpg', 
        './img/emnhi/pic4.jpg',
        './img/emnhi/pic6.jpg',
        './img/emnhi/pic7.png',
        './img/emnhi/pic9.png',
        './img/emnhi/pic10.png',      
        './img/emnhi/pic11.jpg', 
        './img/emnhi/pic12.jpg',
        './img/emnhi/pic13.png',
        // './img/emnhi/pic14.jpg',
        // './img/emnhi/pic15.jpg',
        // './img/emnhi/pic16.jpg',
        // './img/emnhi/pic17.jpg',
        // './img/emnhi/pic18.jpg',
        // './img/emnhi/pic19.jpg',
        // './img/emnhi/pic20.jpg',
        // './img/emnhi/pic21.png',
        // './img/emnhi/pic22.jpg',
        // './img/emnhi/pic23.jpg',
        // './img/emnhi/pic24.jpg',
    ];

    // Placeholder function for shootHeartImages
    function shootHeartImages() {
        spawnHeartPhotosCentered();

        // Thêm CSS để giữ nguyên tỉ lệ, cắt hình vuông và thêm khung ảnh
        const style = document.createElement('style');
        style.innerHTML = `
            .photo {
                object-fit: cover;
                aspect-ratio: 1 / 1;
                border: 4px solid #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.15);
                border-radius: 12px;
                background: #f8f8f8;
            }
        `;
        document.head.appendChild(style);
    }

    // Placeholder function for removeAllHeartImages
    function removeAllHeartImages() {
        const photos = document.querySelectorAll('.photo');
        photos.forEach(photo => photo.remove());
    }
});
