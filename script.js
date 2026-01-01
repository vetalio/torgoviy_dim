// Глобальні налаштування
const FORM_GENERATOR_URL = 'https://veo-optimization.github.io/mini-site/assets/form-generator.html';

// Функція для форматування номера
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber && phoneNumber.length === 10 && phoneNumber.startsWith('0')) {
        return "+380" + phoneNumber.substring(1);
    }
    return phoneNumber || '';
}

// Функція для створення Viber URL
function createViberUrl(phoneNumber) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    return `viber://chat?number=${encodeURIComponent(formattedNumber)}`;
}

// Основна функція копіювання в буфер
function copyToClipboard(text, buttonId, successMessage = '✓ Скопійовано!', skipButtonChange = false) {
    if (!text) return;
    
    navigator.clipboard.writeText(text).then(() => {
        if (skipButtonChange) return;
        
        const button = document.getElementById(buttonId);
        if (!button) return;

        const originalHTML = button.innerHTML;
        const originalBackground = button.style.background || '';
        const originalColor = button.style.color || '';
        
        const computedStyle = window.getComputedStyle(button);
        const originalWidth = computedStyle.width;
        const originalHeight = computedStyle.height;
        const originalMinWidth = computedStyle.minWidth;
        const originalMinHeight = computedStyle.minHeight;
        const originalPadding = computedStyle.padding;
        const originalBoxSizing = computedStyle.boxSizing;

        button.innerHTML = successMessage;
        button.style.background = '#2196F3';
        button.style.color = '#ffffff';
        
        button.style.width = originalWidth;
        button.style.height = originalHeight;
        button.style.minWidth = originalMinWidth;
        button.style.minHeight = originalMinHeight;
        button.style.padding = originalPadding;
        button.style.boxSizing = originalBoxSizing;

        setTimeout(() => {
            button.innerHTML = originalHTML;
            button.style.background = originalBackground;
            button.style.color = originalColor;
            button.style.width = '';
            button.style.height = '';
            button.style.minWidth = '';
            button.style.minHeight = '';
            button.style.padding = '';
            button.style.boxSizing = '';
        }, 2000);
    }).catch(err => {
        console.error('Помилка копіювання:', err);
        alert('Не вдалося скопіювати');
    });
}

// === Функції копіювання реквізитів ===
function copyIBAN() {
    if (typeof IBAN !== 'undefined' && IBAN) {
        copyToClipboard(IBAN, 'copyIbanButton', '✓ IBAN скопійовано');
    }
}

function copyEDRPOU() {
    if (typeof EDRPOU !== 'undefined' && EDRPOU) {
        copyToClipboard(EDRPOU, 'copyEdrpouButton', '✓ ЄДРПОУ скопійовано');
    }
}

function copyPaymentPurpose() {
    if (typeof PAYMENT_PURPOSE !== 'undefined' && PAYMENT_PURPOSE) {
        copyToClipboard(PAYMENT_PURPOSE, 'copyPurposeButton', '✓ Призначення скопійовано');
    }
}

function copyCardNumber() {
    if (typeof CARD_NUMBER !== 'undefined' && CARD_NUMBER) {
        const cleanNumber = CARD_NUMBER.replace(/\s/g, '');
        copyToClipboard(cleanNumber, 'copyCardNumberButton', '✓ Номер картки скопійовано');
    }
}

function copyCardHolder() {
    if (typeof CARD_HOLDER_NAME !== 'undefined' && CARD_HOLDER_NAME) {
        copyToClipboard(CARD_HOLDER_NAME, 'copyCardHolderButton', '✓ Прізвище скопійовано');
    }
}

function copyCardBank() {
    if (typeof CARD_BANK_NAME !== 'undefined' && CARD_BANK_NAME) {
        copyToClipboard(CARD_BANK_NAME, 'copyCardBankButton', '✓ Назва банку скопійовано');
    }
}

// Спеціальна функція для шаблону після оплати (з fallback)
function copyPaymentTemplate() {
    let templateText = window.AFTER_PAYMENT_TEMPLATE || window.AFTER_PAYMENT_TEMPLATE || '';
    
    if (!templateText) {
        const el = document.getElementById('paymentTemplateDisplay');
        if (el) templateText = el.textContent || el.innerText || '';
    }
    
    if (!templateText) {
        alert('Шаблон порожній');
        return;
    }
    
    templateText = templateText.replace(/\\n/g, '\n');
    
    copyToClipboard(templateText, 'copyTemplateButton', '✓ Шаблон скопійовано');
}

// === Соцмережі та контакти ===
function copyTelegramUsername() {
    if (typeof TELEGRAM_PHONE !== 'undefined' && TELEGRAM_PHONE) {
        const phone = formatPhoneNumber(TELEGRAM_PHONE);
        copyToClipboard(phone, 'copyTelegramButton', '', true);
        showCopySuccess('telegramCopyBadge');
    } else if (typeof TELEGRAM_USERNAME !== 'undefined' && TELEGRAM_USERNAME) {
        copyToClipboard('@' + TELEGRAM_USERNAME, 'copyTelegramButton', '', true);
        showCopySuccess('telegramCopyBadge');
    }
}

function copyViberPhone(phone, index) {
    const phoneToCopy = phone || VIBER_PHONE;
    if (!phoneToCopy) return;
    const formattedNumber = formatPhoneNumber(phoneToCopy);
    const buttonId = index !== undefined ? `copyViberPhoneButton${index}` : 'copyViberPhoneButton';
    const badgeId = index !== undefined ? `viberCopyBadge${index}` : 'viberCopyBadge';
    copyToClipboard(formattedNumber, buttonId, '', true);
    showCopySuccess(badgeId);
}

function copyTelegramShowcase() {
    if (!TELEGRAM_SHOWCASE) return;
    const link = getTelegramShowcaseLink();
    if (link) {
        copyToClipboard(link, 'copyTelegramShowcaseButton', '', true);
        showCopySuccess('showcaseCopyBadge');
    }
}

function copyInstagramUsername() {
    if (!INSTAGRAM_USERNAME) return;
    copyToClipboard('@' + INSTAGRAM_USERNAME, 'copyInstagramButton', '', true);
    showCopySuccess('instagramCopyBadge');
}

function copyBiggoLive() {
    if (!BIGGO_LIVE_URL) return;
    const fullUrl = getBiggoLiveUrl();
    copyToClipboard(fullUrl, 'copyBiggoLiveButton', '', true);
    showCopySuccess('biggoLiveCopyBadge');
}

function showCopySuccess(badgeId) {
    const badge = document.getElementById(badgeId);
    if (badge) {
        badge.classList.add('show');
        setTimeout(() => badge.classList.remove('show'), 2000);
    }
}

// === Решта функцій (модалки, відкриття посилань, календар тощо) ===
let currentContactData = null;

// [Тут вставте весь інший код з попередньої версії: 
// showContactModal, closeContactModal, modalCopyContact, modalOpenContact,
// openTelegram, openViber, всі функції для Biggo, Instagram, календар і т.д.]

// Важливо: залиште функції нижче без змін
function openTelegram() { /* ... як раніше ... */ }
function openViber(phone) { /* ... як раніше ... */ }
// ... всі інші функції (getBiggoLiveUsername, календар, generatePublicOffer тощо)

// Ініціалізація
document.addEventListener('DOMContentLoaded', function() {
    // Обробка CLIENT_CONSTANTS (якщо є)
    if (typeof CLIENT_CONSTANTS !== 'undefined' && CLIENT_CONSTANTS?.trim()) {
        if (typeof processClientData === 'function') processClientData();
    }

    setTimeout(() => {
        // Тут весь код заповнення полів (shopName, IBAN, контакти тощо) — залиште як був
        // ... (той великий блок з document.getElementById і т.д.)

        generatePublicOffer();

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeContactModal();
        });
    }, 100);
});
