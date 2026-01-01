// Глобальні налаштування
const FORM_GENERATOR_URL = 'https://veo-optimization.github.io/mini-site/assets/form-generator.html';

// Функція форматування номера телефону
function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    if (phoneNumber.length === 10 && phoneNumber.startsWith('0')) {
        return "+380" + phoneNumber.substring(1);
    }
    return phoneNumber;
}

// Створення Viber-посилання
function createViberUrl(phoneNumber) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    return `viber://chat?number=${encodeURIComponent(formattedNumber)}`;
}

// Основна функція копіювання
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

// === Усі функції копіювання ===
function copyIBAN() {
    if (typeof IBAN !== 'undefined' && IBAN) {
        copyToClipboard(IBAN.trim(), 'copyIbanButton', '✓ IBAN скопійовано');
    }
}

function copyEDRPOU() {
    if (typeof EDRPOU !== 'undefined' && EDRPOU) {
        copyToClipboard(EDRPOU.trim(), 'copyEdrpouButton', '✓ ЄДРПОУ скопійовано');
    }
}

function copyPaymentPurpose() {
    if (typeof PAYMENT_PURPOSE !== 'undefined' && PAYMENT_PURPOSE) {
        copyToClipboard(PAYMENT_PURPOSE.trim(), 'copyPurposeButton', '✓ Призначення скопійовано');
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
        copyToClipboard(CARD_HOLDER_NAME.trim(), 'copyCardHolderButton', '✓ Прізвище скопійовано');
    }
}

function copyCardBank() {
    if (typeof CARD_BANK_NAME !== 'undefined' && CARD_BANK_NAME) {
        copyToClipboard(CARD_BANK_NAME.trim(), 'copyCardBankButton', '✓ Назва банку скопійовано');
    }
}

// Копіювання шаблону після оплати — ВАЖЛИВО: з переносами рядків
function copyPaymentTemplate() {
    let templateText = '';

    // Спочатку беремо з глобальної змінної (зберігає \n)
    if (typeof AFTER_PAYMENT_TEMPLATE !== 'undefined' && AFTER_PAYMENT_TEMPLATE) {
        templateText = AFTER_PAYMENT_TEMPLATE;
    } else if (typeof window.AFTER_PAYMENT_TEMPLATE !== 'undefined' && window.AFTER_PAYMENT_TEMPLATE) {
        templateText = window.AFTER_PAYMENT_TEMPLATE;
    }

    // Якщо не знайшли — беремо з DOM (textContent зберігає переноси)
    if (!templateText) {
        const el = document.getElementById('paymentTemplateDisplay');
        if (el) {
            templateText = el.textContent || el.innerText || '';
        }
    }

    if (!templateText) {
        alert('Шаблон порожній');
        return;
    }

    // Замінюємо екрановані \n на справжні переноси
    templateText = templateText.replace(/\\n/g, '\n');

    copyToClipboard(templateText, 'copyTemplateButton', '✓ Шаблон скопійовано');
}

// Соцмережі
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
    const formatted = formatPhoneNumber(phoneToCopy);
    const buttonId = index !== undefined ? `copyViberPhoneButton${index}` : 'copyViberPhoneButton';
    const badgeId = index !== undefined ? `viberCopyBadge${index}` : 'viberCopyBadge';
    copyToClipboard(formatted, buttonId, '', true);
    showCopySuccess(badgeId);
}

function copyTelegramShowcase() {
    if (!TELEGRAM_SHOWCASE) return;
    const link = getTelegramShowcaseLink();
    copyToClipboard(link, 'copyTelegramShowcaseButton', '', true);
    showCopySuccess('showcaseCopyBadge');
}

function copyInstagramUsername() {
    if (!INSTAGRAM_USERNAME) return;
    copyToClipboard('@' + INSTAGRAM_USERNAME, 'copyInstagramButton', '', true);
    showCopySuccess('instagramCopyBadge');
}

function copyBiggoLive() {
    if (!BIGGO_LIVE_URL) return;
    const url = getBiggoLiveUrl();
    copyToClipboard(url, 'copyBiggoLiveButton', '', true);
    showCopySuccess('biggoLiveCopyBadge');
}

function showCopySuccess(badgeId) {
    const badge = document.getElementById(badgeId);
    if (badge) {
        badge.classList.add('show');
        setTimeout(() => badge.classList.remove('show'), 2000);
    }
}

// === Решта функцій (модалки, відкриття месенджерів, календар тощо) ===
// Вставте сюди весь інший код з оригінального файлу:
// - showContactModal, closeContactModal, modalCopyContact, modalOpenContact
// - openTelegram, openViber, openInstagram, openBiggoLive
// - функції для Biggo (getBiggoLiveUsername, getBiggoLiveUrl)
// - весь код календаря (extractCalendarId → generatePublicOffer)
// - великий блок в DOMContentLoaded з заповненням полів

// Приклад (скорочено):
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        // Заповнення всіх полів на сторінці (shopName, fopName, ibanValue тощо)
        // ... ваш оригінальний код заповнення ...

        // Особливо важливо: шаблон після оплати
        const templateDisplay = document.getElementById('paymentTemplateDisplay');
        if (templateDisplay && (AFTER_PAYMENT_TEMPLATE || window.AFTER_PAYMENT_TEMPLATE)) {
            const text = (AFTER_PAYMENT_TEMPLATE || window.AFTER_PAYMENT_TEMPLATE || '');
            templateDisplay.textContent = text;
            templateDisplay.style.whiteSpace = 'pre-line';
        }

        generatePublicOffer();

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeContactModal();
        });
    }, 100);
});
