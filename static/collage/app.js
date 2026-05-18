document.addEventListener('DOMContentLoaded', () => {
    const justifiedLayout = require('justified-layout');
    const board = document.getElementById('collage-board');
    const boardWrapper = document.getElementById('board-wrapper');
    const imageUpload = document.getElementById('image-upload');

    let uploadedImages = []; // Stores { src: string, ratio: number }
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
            emptyDesc: "Click the upload button or drop files here to begin.",
            loading: "Processing Photos...",
            tourBtn: "Help / Tour",
            tourWelcomeTitle: "Welcome!",
            tourWelcomeDesc: "Let's create your perfect A4 collage in 30 seconds.",
            tourStep1Title: "Upload Photos",
            tourStep1Desc: "Click or drag images here. We support PNG and JPG.",
            tourCycleTitle: "Try Different Layouts",
            tourCycleDesc: "Click this to reshuffle photos into a new mathematical grid. Try it multiple times!",
            tourStretchTitle: "Fill the Page",
            tourStretchDesc: "Stretches the grid to eliminate white space at the bottom.",
            tourStep2Title: "Page Settings",
            tourStep2Desc: "Fine-tune orientation, colors, and margins.",
            tourStep3Title: "Ready for Print",
            tourStep3Desc: "Export at 300 DPI (high-resolution) for professional results.",
            tourBoardTitle: "The Canvas",
            tourBoardDesc: "Your photos will appear here, perfectly aligned without cropping."
        },
        de: {
            title: "Collage Ersteller",
            step1: "1. Fotos hinzufügen:",
            uploadBtn: "📷 Hochladen oder reinziehen",
            uploadDesc: "Lade beliebig viele Fotos hoch. Das System berechnet das optimale Raster!",
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
            emptyDesc: "Klicke auf Hochladen oder ziehe Dateien hierher.",
            loading: "Fotos werden verarbeitet...",
            tourBtn: "Hilfe / Tour",
            tourWelcomeTitle: "Willkommen!",
            tourWelcomeDesc: "Erstelle deine perfekte A4-Collage in nur 30 Sekunden.",
            tourStep1Title: "Fotos hochladen",
            tourStep1Desc: "Klicke hier oder ziehe deine Fotos einfach in diesen Bereich.",
            tourCycleTitle: "Layout ändern",
            tourCycleDesc: "Mische die Fotos neu für ein anderes mathematisches Raster.",
            tourStretchTitle: "Seite füllen",
            tourStretchDesc: "Streckt das Raster, um leeren Platz unten zu füllen.",
            tourStep2Title: "Einstellungen",
            tourStep2Desc: "Passe Ausrichtung, Farben und Abstände an.",
            tourStep3Title: "Druckfertig",
            tourStep3Desc: "Exportiere in 300 DPI (hochauflösend) für perfekte Druckergebnisse.",
            tourBoardTitle: "Deine Leinwand",
            tourBoardDesc: "Deine Fotos erscheinen hier, mathematisch perfekt angeordnet."
        }
    };

    let currentLang = 'en';

    function applyTranslations() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (i18n[currentLang][key]) {
                if (key === 'stretchBtn' && stretchToFill) {
                    el.innerText = i18n[currentLang].stretchBtnActive;
                } else if (el.tagName === 'OPTION') {
                    el.text = i18n[currentLang][key];
                } else {
                    const span = el.querySelector('span[data-i18n]');
                    if (span) {
                        span.innerText = i18n[currentLang][key];
                    } else {
                        // Directly update text if no children with data-i18n
                        const hasChildrenWithI18n = Array.from(el.children).some(c => c.hasAttribute('data-i18n'));
                        if (!hasChildrenWithI18n) {
                             const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3 && n.textContent.trim().length > 0);
                             if (textNode) textNode.textContent = i18n[currentLang][key];
                             else el.innerText = i18n[currentLang][key];
                        }
                    }
                }
            }
        });
    }

    document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.lang-btn[data-lang]').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            currentLang = e.target.getAttribute('data-lang');
            applyTranslations();
            const url = new URL(window.location);
            url.searchParams.set('lang', currentLang);
            window.history.pushState({}, '', url);
        });
    });

    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    if (langParam && (langParam === 'en' || langParam === 'de')) {
        currentLang = langParam;
        document.querySelectorAll('.lang-btn[data-lang]').forEach(btn => {
            if (btn.getAttribute('data-lang') === currentLang) btn.classList.add('active');
            else btn.classList.remove('active');
        });
        applyTranslations();
    }

    // --- Interactive Tour ---
    const initTour = () => {
        const tourBtn = document.getElementById('btn-tour');
        if (!tourBtn) return;

        tourBtn.addEventListener('click', () => {
            const driverObj = window.driver.js.driver;
            const tour = driverObj({
                showProgress: true,
                animate: true,
                steps: [
                    { 
                        element: 'h2[data-i18n="title"]', 
                        popover: { title: i18n[currentLang].tourWelcomeTitle, description: i18n[currentLang].tourWelcomeDesc } 
                    },
                    { 
                        element: '#drop-zone', 
                        popover: { title: i18n[currentLang].tourStep1Title, description: i18n[currentLang].tourStep1Desc } 
                    },
                    { 
                        element: '#btn-cycle', 
                        popover: { title: i18n[currentLang].tourCycleTitle, description: i18n[currentLang].tourCycleDesc } 
                    },
                    { 
                        element: '#btn-stretch', 
                        popover: { title: i18n[currentLang].tourStretchTitle, description: i18n[currentLang].tourStretchDesc } 
                    },
                    { 
                        element: '#settings-group', 
                        popover: { title: i18n[currentLang].tourStep2Title, description: i18n[currentLang].tourStep2Desc } 
                    },
                    { 
                        element: '.export-group', 
                        popover: { title: i18n[currentLang].tourStep3Title, description: i18n[currentLang].tourStep3Desc } 
                    },
                    { 
                        element: '#collage-board', 
                        popover: { title: i18n[currentLang].tourBoardTitle, description: i18n[currentLang].tourBoardDesc } 
                    }
                ]
            });
            tour.drive();
        });
    };

    function scaleBoardToFit() {
        const A4_W = board.classList.contains('landscape') ? 1123 : 794;
        const A4_H = board.classList.contains('landscape') ? 794 : 1123;
        const wrapperW = boardWrapper.clientWidth - 60;
        const wrapperH = boardWrapper.clientHeight - 60;
        const scale = Math.min(wrapperW / A4_W, wrapperH / A4_H, 1);
        board.style.transform = `scale(${scale})`;
    }

    window.addEventListener('resize', scaleBoardToFit);

    const processFiles = async (files) => {
        if (!files || files.length === 0) return;
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) loadingOverlay.style.display = 'flex';

        const newImages = [];
        try {
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
                        tempImg.onload = () => resolve({ src: dataUrl, ratio: tempImg.width / tempImg.height });
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
                calculateBestGrids();
            }
        } finally {
            if (loadingOverlay) loadingOverlay.style.display = 'none';
        }
    };

    imageUpload.addEventListener('change', function(e) {
        processFiles(Array.from(e.target.files));
        this.value = ''; 
    });

    const dropZone = document.getElementById('drop-zone');
    if (dropZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => dropZone.addEventListener(evt, e => { e.preventDefault(); e.stopPropagation(); }, false));
        ['dragenter', 'dragover'].forEach(evt => dropZone.addEventListener(evt, () => dropZone.classList.add('dragover'), false));
        ['dragleave', 'drop'].forEach(evt => dropZone.addEventListener(evt, () => dropZone.classList.remove('dragover'), false));
        dropZone.addEventListener('drop', (e) => processFiles(Array.from(e.dataTransfer.files)), false);
    }

    const btnClear = document.getElementById('btn-clear');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            uploadedImages = [];
            board.innerHTML = `
                <div id="empty-state">
                    <p data-i18n="emptyTitle">${i18n[currentLang].emptyTitle}</p>
                    <p data-i18n="emptyDesc">${i18n[currentLang].emptyDesc}</p>
                </div>
            `;
            scaleBoardToFit();
        });
    }

    const btnStretch = document.getElementById('btn-stretch');
    if (btnStretch) {
        btnStretch.addEventListener('click', (e) => {
            stretchToFill = !stretchToFill;
            e.target.innerText = stretchToFill ? i18n[currentLang].stretchBtnActive : i18n[currentLang].stretchBtn;
            calculateBestGrids();
        });
    }

    function calculateBestGrids() {
        if (uploadedImages.length === 0) return;
        board.innerHTML = ''; 
        const isLandscape = board.classList.contains('landscape');
        const A4_W = isLandscape ? 1123 : 794;
        const A4_H = isLandscape ? 794 : 1123;
        const gapInput = document.getElementById('grid-gap');
        const gap = gapInput ? parseInt(gapInput.value) || 0 : 0;
        const targetW = A4_W - (gap * 2);
        const targetH = A4_H - (gap * 2);
        const aspectRatios = uploadedImages.map(img => img.ratio);
        let minH = 10, maxH = targetH, bestGeometry = null;
        for (let i = 0; i < 15; i++) {
            const midH = (minH + maxH) / 2;
            const geometry = justifiedLayout(aspectRatios, {
                containerWidth: targetW, targetRowHeight: midH, containerPadding: 0, boxSpacing: gap, showWidows: true
            });
            bestGeometry = geometry;
            if (geometry.containerHeight > targetH) maxH = midH; else minH = midH;
        }
        let scaleX = 1, scaleY = 1;
        if (stretchToFill) scaleY = bestGeometry.containerHeight > 0 ? targetH / bestGeometry.containerHeight : 1;
        else if (bestGeometry.containerHeight > targetH) {
            scaleX = scaleY = targetH / bestGeometry.containerHeight;
        }
        const finalContainerW = targetW * scaleX, finalContainerH = bestGeometry.containerHeight * scaleY;
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
            slot.style.left = `${box.left * scaleX}px`;
            slot.style.top = `${box.top * scaleY}px`;
            slot.style.width = `${box.width * scaleX}px`;
            slot.style.height = `${box.height * scaleY}px`;
            const imgEl = document.createElement('img');
            imgEl.src = uploadedImages[i].src;
            imgEl.style.objectFit = 'cover'; 
            slot.appendChild(imgEl);
            rowsContainer.appendChild(slot);
        });
        board.appendChild(rowsContainer);
        scaleBoardToFit();
    }

    const btnCycle = document.getElementById('btn-cycle');
    if (btnCycle) {
        btnCycle.addEventListener('click', () => {
            if (uploadedImages.length === 0) return;
            for (let i = uploadedImages.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [uploadedImages[i], uploadedImages[j]] = [uploadedImages[j], uploadedImages[i]];
            }
            calculateBestGrids();
        });
    }

    const orientationSelect = document.getElementById('orientation-select');
    if (orientationSelect) {
        orientationSelect.addEventListener('change', (e) => {
            board.className = e.target.value;
            calculateBestGrids();
        });
    }

    const bgColorInput = document.getElementById('bg-color');
    if (bgColorInput) bgColorInput.addEventListener('input', (e) => board.style.backgroundColor = e.target.value);

    const gridGapInput = document.getElementById('grid-gap');
    if (gridGapInput) gridGapInput.addEventListener('input', (e) => {
        board.style.padding = `${parseInt(e.target.value) || 0}px`;
        calculateBestGrids();
    });

    const exportCanvas = (format) => {
        html2canvas(board, { scale: 3, useCORS: true, backgroundColor: board.style.backgroundColor || '#ffffff' }).then(canvas => {
            const dataURL = canvas.toDataURL(`image/${format}`, 1.0);
            const link = document.createElement('a');
            link.download = `photo-collage-A4.${format === 'jpeg' ? 'jpg' : 'png'}`;
            link.href = dataURL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    const btnExportPng = document.getElementById('btn-export-png');
    if (btnExportPng) btnExportPng.addEventListener('click', () => exportCanvas('png'));
    const btnExportJpg = document.getElementById('btn-export-jpg');
    if (btnExportJpg) btnExportJpg.addEventListener('click', () => exportCanvas('jpeg'));

    initTour();
    scaleBoardToFit();
    applyTranslations();
});