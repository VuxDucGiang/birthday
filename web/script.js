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
        letterContent.innerHTML = '<img src="/img/Letter.jpg" alt="Bức ảnh bí mật" class="animate" style="max-width: 100%; border-radius: 10px;">';

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
        "https://media.discordapp.net/attachments/1379317837503402005/1402529165084983357/quality_restoration_20250705203000986.png?ex=68943e92&is=6892ed12&hm=755702dfb211a7a0af96734059548939ff534467d6d720046a97a80b17f7b4f2&=&format=webp&quality=lossless&width=555&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529165789495397/quality_restoration_20250705221759878.png?ex=68943e92&is=6892ed12&hm=819cc1f5e1c52a0f222ff468c04a351f3439a6ed5ea4cf6f1183ea34dce8fa2f&=&format=webp&quality=lossless&width=645&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529167278604379/quality_restoration_20250706134334435.png?ex=68943e93&is=6892ed13&hm=bcd49cbd4a88c01aea390a33be8760c97841b3c68dbb9e393a5a5a9597f062f5&=&format=webp&quality=lossless&width=645&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529163797205053/quality_restoration_20250531001648631.png?ex=68943e92&is=6892ed12&hm=fbb463fcef5f2fb6b991156a8c175a99f02ff52ec017ec786cee104e232b8704&=&format=webp&quality=lossless&width=575&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529167878258730/quality_restoration_20250315010319943.jpg?ex=68943e93&is=6892ed13&hm=6e73bda012ff5aef55c8cbba46816f2a46859324b82634b9d7915646ce57612e&=&format=webp&width=676&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529308605419581/quality_restoration_20241005223354628.jpg?ex=68943eb4&is=6892ed34&hm=2e2e993f1b81597c390abb82b3acdfa1da3a609a40075fec8ee7b35c391ecf02&=&format=webp&width=846&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529309138354226/quality_restoration_20240908142534042.jpg?ex=68943eb5&is=6892ed35&hm=b5e2a3ef46732aa71bd755a4ada7e22f9b4eb6efa1107c412f53359dd64cb555&=&format=webp&width=645&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529309825962074/quality_restoration_20241006120309834.jpg?ex=68943eb5&is=6892ed35&hm=9b4a1502d4730c51431552ab897aab10da33fb8d3e582e2e3ba62acd0e19a793&=&format=webp&width=608&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529014840561745/IMG_0213.jpg?ex=68943e6e&is=6892ecee&hm=26f8be2768a4227198cfef194f02cff1868c9b3b2da2969d71983f2f2f0f2b0b&=&format=webp&width=645&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529015893590037/quality_restoration_20240624214203279.jpg?ex=68943e6f&is=6892ecef&hm=400f3ff566812f8e0ac45f621cb39365605b9538bc2f2e35fa0db559d76115bc&=&format=webp&width=631&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1402529017541824653/quality_restoration_20240808140337618.jpg?ex=68943e6f&is=6892ecef&hm=0ae100489eabab6ebbd9f9ea712c9e6ecd84b424105e9fb66c902f52405eff42&=&format=webp&width=563&height=860",
        "https://media.discordapp.net/attachments/1379317837503402005/1379317906688446504/IMG_1.1.jpg?ex=68942d67&is=6892dbe7&hm=9c32c80a99cef1e3a43a4f6d92711ff5a0fe3b06d6358a6c73851435b62edbec&=&format=webp&width=806&height=806",
        "https://media.discordapp.net/attachments/1379317837503402005/1379321964916772935/Screenshot_2025-06-03_112953.png?ex=6894312e&is=6892dfae&hm=ba040bc4cca0f99fa041c72391a5084b077d3f116b8cf484c8219612fd8e94df&=&format=webp&quality=lossless&width=659&height=944",
        "https://media.discordapp.net/attachments/1379317837503402005/1379322420783091723/image.png?ex=6894319b&is=6892e01b&hm=ff9628bd165b3c9334c9ceed5708ff0dae732434b9f7e0d9a9fee3922d7034ab&=&format=webp&quality=lossless&width=655&height=819"
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
