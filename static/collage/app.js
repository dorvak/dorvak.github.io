document.addEventListener('DOMContentLoaded', () => {
    const justifiedLayout = require('justified-layout');
    const board = document.getElementById('collage-board');
    const boardWrapper = document.getElementById('board-wrapper');
    const imageUpload = document.getElementById('image-upload');

    let uploadedImages = []; // Stores { src: string, ratio: number }
    let topPartitions = []; 
    let currentPartitionIndex = 0;
    let stretchToFill = false;

    // --- Localization ---
    const i18n = {
        en: {
            title: "Collage Maker",
            step1: "1. Add Your Photos:",
            uploadBtn: "📷 Upload or Drop Photos",
            uploadDesc: "Upload any number of photos. The system will mathematically calculate the optimal grid to fit them perfectly on the page!",
            cycleBtn: "🔄 Cycle Grid Variants",
            stretchBtn: "↕️ Stretch to Fill A4",
            stretchBtnActive: "✅ Stretched to A4",
            clearBtn: "🗑️ Clear All Photos",
            step2: "2. Page Settings:",
            portrait: "A4 Portrait",
            landscape: "A4 Landscape",
            bgColor: "Bg Color",
            gap: "Gap (px)",
            step3: "3. Export High-Res (300 DPI):",
            exportPng: "Download PNG",
            exportJpg: "Download JPEG",
            emptyTitle: "No photos uploaded",
            emptyDesc: "Click the upload button or drop files here to begin."
        },
        de: {
            title: "Collage Ersteller",
            step1: "1. Fotos hinzufügen:",
            uploadBtn: "📷 Hochladen oder reinziehen",
            uploadDesc: "Lade beliebig viele Fotos hoch. Das System berechnet das optimale Raster, damit alles perfekt auf die Seite passt!",
            cycleBtn: "🔄 Raster durchwechseln",
            stretchBtn: "↕️ Auf A4 strecken",
            stretchBtnActive: "✅ Auf A4 gestreckt",
            clearBtn: "🗑️ Alle Fotos löschen",
            step2: "2. Seiteneinstellungen:",
            portrait: "A4 Hochformat",
            landscape: "A4 Querformat",
            bgColor: "Hintergrund",
            gap: "Abstand (px)",
            step3: "3. Exportieren (300 DPI):",
            exportPng: "Als PNG speichern",
            exportJpg: "Als JPEG speichern",
            emptyTitle: "Keine Fotos hochgeladen",
            emptyDesc: "Klicke auf Hochladen oder ziehe Dateien hierher."
        }
    };

    let currentLang = 'en';

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[currentLang][key]) {
                if (key === 'stretchBtn' && stretchToFill) {
                    el.innerText = i18n[currentLang].stretchBtnActive;
                } else {
                    if (el.tagName === 'SPAN' || el.tagName === 'LABEL' || el.tagName === 'P' || el.tagName === 'H2' || el.tagName === 'SMALL' || el.tagName === 'BUTTON' || el.tagName === 'OPTION') {
                        if (el.children.length === 0) {
                            el.innerText = i18n[currentLang][key];
                        } else {
                            // Find the child with data-i18n if it exists or just handle the span case
                            const span = el.querySelector('span');
                            if (span && span.getAttribute('data-i18n') === key) {
                                span.innerText = i18n[currentLang][key];
                            }
                        }
                    }
                }
            }
        });
    }

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLang = e.target.getAttribute('data-lang');
            applyTranslations();
            // Update URL without reloading
            const url = new URL(window.location);
            url.searchParams.set('lang', currentLang);
            window.history.pushState({}, '', url);
        });
    });

    // Check for lang parameter in URL
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'en' || langParam === 'de')) {
        currentLang = langParam;
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        applyTranslations();
    }

    // --- Dynamic Scaling for Viewport ---
    function scaleBoardToFit() {
        const A4_W = board.classList.contains('landscape') ? 1123 : 794;
        const A4_H = board.classList.contains('landscape') ? 794 : 1123;
        
        const wrapperW = boardWrapper.clientWidth - 40;
        const wrapperH = boardWrapper.clientHeight - 40;
        
        const scale = Math.min(wrapperW / A4_W, wrapperH / A4_H, 1);
        board.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', scaleBoardToFit);

    // --- Photo Upload Logic ---
    const processFiles = async (files) => {
        if (!files || files.length === 0) return;

        const newImages = [];
        
        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            if (!file.type.startsWith('image/')) continue;

            try {
                const dataUrl = await new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (e) => resolve(e.target.result);
                    reader.onerror = () => reject(reader.error);
                    reader.readAsDataURL(file);
                });

                const imgData = await new Promise((resolve, reject) => {
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        resolve({
                            src: dataUrl,
                            ratio: tempImg.width / tempImg.height
                        });
                    };
                    tempImg.onerror = () => reject(new Error("Image decoding failed"));
                    tempImg.src = dataUrl;
                });
                
                newImages.push(imgData);
            } catch (err) {
                console.error(`Failed to load ${file.name}:`, err);
            }
        }

        if (newImages.length > 0) {
            uploadedImages = uploadedImages.concat(newImages);
            document.getElementById('btn-cycle').style.display = 'block';
            document.getElementById('btn-stretch').style.display = 'block';
            calculateBestGrids();
        }
    };

    imageUpload.addEventListener('change', function(e) {
        const files = Array.from(e.target.files);
        processFiles(files);
        this.value = ''; 
    });

    // --- Drag and Drop Logic ---
    const dropZone = document.getElementById('drop-zone');

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.add('dragover'), false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => dropZone.classList.remove('dragover'), false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        const files = Array.from(dt.files);
        processFiles(files);
    }, false);

    document.getElementById('btn-clear').addEventListener('click', () => {
        uploadedImages = [];
        topPartitions = [];
        currentPartitionIndex = 0;
        document.getElementById('btn-cycle').style.display = 'none';
        document.getElementById('btn-stretch').style.display = 'none';
        board.innerHTML = `
            <div id="empty-state">
                <p data-i18n="emptyTitle">${i18n[currentLang].emptyTitle}</p>
                <p data-i18n="emptyDesc">${i18n[currentLang].emptyDesc}</p>
            </div>
        `;
        scaleBoardToFit();
    });

    document.getElementById('btn-stretch').addEventListener('click', (e) => {
        stretchToFill = !stretchToFill;
        e.target.innerText = stretchToFill ? i18n[currentLang].stretchBtnActive : i18n[currentLang].stretchBtn;
        calculateBestGrids();
    });

    // --- Mathematical Partition Algorithm (Using Flickr's Justified-Layout) ---
    function calculateBestGrids() {
        if (uploadedImages.length === 0) return;
        board.innerHTML = ''; 

        const isLandscape = board.classList.contains('landscape');
        const A4_W = isLandscape ? 1123 : 794;
        const A4_H = isLandscape ? 794 : 1123;
        
        const gap = parseInt(document.getElementById('grid-gap').value) || 0;
        const targetW = A4_W - (gap * 2);
        const targetH = A4_H - (gap * 2);

        const aspectRatios = uploadedImages.map(img => img.ratio);

        let minH = 10;
        let maxH = targetH;
        let bestGeometry = null;
        
        for (let i = 0; i < 15; i++) {
            const midH = (minH + maxH) / 2;
            const geometry = justifiedLayout(aspectRatios, {
                containerWidth: targetW,
                targetRowHeight: midH,
                containerPadding: 0,
                boxSpacing: gap,
                showWidows: true
            });
            bestGeometry = geometry;
            if (geometry.containerHeight > targetH) {
                maxH = midH;
            } else {
                minH = midH;
            }
        }

        let scaleX = 1;
        let scaleY = 1;
        
        if (stretchToFill) {
            scaleX = 1; 
            scaleY = bestGeometry.containerHeight > 0 ? targetH / bestGeometry.containerHeight : 1;
        } else {
            if (bestGeometry.containerHeight > targetH) {
                const uniformScale = targetH / bestGeometry.containerHeight;
                scaleX = uniformScale;
                scaleY = uniformScale;
            }
        }

        const finalContainerW = targetW * scaleX;
        const finalContainerH = bestGeometry.containerHeight * scaleY;

        const rowsContainer = document.createElement('div');
        rowsContainer.id = 'rows-container'; 
        rowsContainer.style.position = 'relative';
        rowsContainer.style.width = `${finalContainerW}px`; 
        rowsContainer.style.height = `${finalContainerH}px`;

        board.style.alignItems = 'center';
        board.style.justifyContent = 'center'; 

        bestGeometry.boxes.forEach((box, i) => {
            const slot = document.createElement('div');
            slot.className = 'slot';
            slot.style.position = 'absolute';
            
            const left = box.left * scaleX;
            const top = box.top * scaleY;
            const width = box.width * scaleX;
            const height = box.height * scaleY;
            
            slot.style.left = `${left}px`;
            slot.style.top = `${top}px`;
            slot.style.width = `${width}px`;
            slot.style.height = `${height}px`;

            const imgEl = document.createElement('img');
            imgEl.src = uploadedImages[i].src;
            imgEl.style.objectFit = 'cover'; 
            
            slot.appendChild(imgEl);
            rowsContainer.appendChild(slot);
        });

        board.appendChild(rowsContainer);
        scaleBoardToFit();
    }

    document.getElementById('btn-cycle').addEventListener('click', () => {
        if (uploadedImages.length === 0) return;
        for (let i = uploadedImages.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [uploadedImages[i], uploadedImages[j]] = [uploadedImages[j], uploadedImages[i]];
        }
        calculateBestGrids();
    });

    document.getElementById('orientation-select').addEventListener('change', (e) => {
        board.className = e.target.value;
        calculateBestGrids();
    });

    document.getElementById('bg-color').addEventListener('input', (e) => {
        board.style.backgroundColor = e.target.value;
    });

    document.getElementById('grid-gap').addEventListener('input', (e) => {
        const gap = parseInt(e.target.value) || 0;
        board.style.padding = `${gap}px`;
        calculateBestGrids();
    });

    const exportCanvas = (format) => {
        html2canvas(board, {
            scale: 3, 
            useCORS: true,
            backgroundColor: board.style.backgroundColor || '#ffffff'
        }).then(canvas => {
            const dataURL = canvas.toDataURL(`image/${format}`, 1.0);
            const link = document.createElement('a');
            link.download = `photo-collage-A4.${format === 'jpeg' ? 'jpg' : 'png'}`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    document.getElementById('btn-export-png').addEventListener('click', () => exportCanvas('png'));
    document.getElementById('btn-export-jpg').addEventListener('click', () => exportCanvas('jpeg'));

    scaleBoardToFit();
});