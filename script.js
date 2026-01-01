// Глобальні налаштування
const FORM_GENERATOR_URL = 'https://veo-optimization.github.io/mini-site/assets/form-generator.html';

// Форматування номера телефону
function formatPhoneNumber(phoneNumber) {
    if (!phoneNumber) return '';
    if (phoneNumber.length === 10 && phoneNumber.startsWith('0')) {
        return "+380" + phoneNumber.substring(1);
    }
    return phoneNumber;
}

// Viber URL
function createViberUrl(phoneNumber) {
    const formatted = formatPhoneNumber(phoneNumber);
    return `viber://chat?number=${encodeURIComponent(formatted)}`;
}

// Основна функція копіювання
function copyToClipboard(text, buttonId, successMessage = '✓ Скопійовано!', skipButtonChange = false) {
    if (!text) return;

    navigator.clipboard.writeText(text).then(() => {
        if (skipButtonChange) return;

        const button = document.getElementById(buttonId);
        if (!button) return;

        const originalHTML = button.innerHTML;
        const originalBg = button.style.background || '';
        const originalColor = button.style.color || '';

        const style = window.getComputedStyle(button);
        const originalWidth = style.width;
        const originalHeight = style.height;
        const originalMinWidth = style.minWidth;
        const originalMinHeight = style.minHeight;
        const originalPadding = style.padding;
        const originalBoxSizing = style.boxSizing;

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
            button.style.background = originalBg;
            button.style.color = originalColor;
            button.style.width = '';
            button.style.height = '';
            button.style.minWidth = '';
            button.style.minHeight = '';
            button.style.padding = '';
            button.style.boxSizing = '';
        }, 2000);
    }).catch(() => {
        alert('Не вдалося скопіювати');
    });
}

// === Копіювання реквізитів ===
function copyIBAN() {
    if (IBAN) copyToClipboard(IBAN.trim(), 'copyIbanButton', '✓ IBAN скопійовано');
}

function copyEDRPOU() {
    if (EDRPOU) copyToClipboard(EDRPOU.trim(), 'copyEdrpouButton', '✓ ЄДРПОУ скопійовано');
}

function copyPaymentPurpose() {
    if (PAYMENT_PURPOSE) copyToClipboard(PAYMENT_PURPOSE.trim(), 'copyPurposeButton', '✓ Призначення скопійовано');
}

function copyCardNumber() {
    if (CARD_NUMBER) {
        const clean = CARD_NUMBER.replace(/\s/g, '');
        copyToClipboard(clean, 'copyCardNumberButton', '✓ Номер картки скопійовано');
    }
}

function copyCardHolder() {
    if (CARD_HOLDER_NAME) copyToClipboard(CARD_HOLDER_NAME.trim(), 'copyCardHolderButton', '✓ Прізвище скопійовано');
}

function copyCardBank() {
    if (CARD_BANK_NAME) copyToClipboard(CARD_BANK_NAME.trim(), 'copyCardBankButton', '✓ Назва банку скопійовано');
}

// КРИТИЧНО ВИПРАВЛЕНА функція — тепер копіює саме той текст, що видно користувачу
function copyPaymentTemplate() {
    const displayElement = document.getElementById('paymentTemplateDisplay');
    let textToCopy = '';

    if (displayElement) {
        // Беремо textContent — він зберігає переноси рядків найкраще
        textToCopy = displayElement.textContent || displayElement.innerText || '';
    }

    // Запасний варіант — з глобальної змінної (якщо DOM ще не заповнений)
    if (!textToCopy && typeof AFTER_PAYMENT_TEMPLATE !== 'undefined') {
        textToCopy = AFTER_PAYMENT_TEMPLATE;
    }

    if (!textToCopy) {
        alert('Шаблон порожній');
        return;
    }

    // Замінюємо можливі екрановані переноси
    textToCopy = textToCopy.replace(/\\n/g, '\n');

    copyToClipboard(textToCopy, 'copyTemplateButton', '✓ Шаблон скопійовано');
}

// === Соцмережі ===
function copyTelegramUsername() {
    let text = '';
    if (TELEGRAM_PHONE) {
        text = formatPhoneNumber(TELEGRAM_PHONE);
    } else if (TELEGRAM_USERNAME) {
        text = '@' + TELEGRAM_USERNAME;
    }
    if (text) {
        copyToClipboard(text, 'copyTelegramButton', '', true);
        showCopySuccess('telegramCopyBadge');
    }
}

function copyViberPhone(phone, index) {
    const p = phone || VIBER_PHONE;
    if (!p) return;
    const formatted = formatPhoneNumber(p);
    const btnId = index !== undefined ? `copyViberPhoneButton${index}` : 'copyViberPhoneButton';
    const badgeId = index !== undefined ? `viberCopyBadge${index}` : 'viberCopyBadge';
    copyToClipboard(formatted, btnId, '', true);
    showCopySuccess(badgeId);
}

function copyTelegramShowcase() {
    if (!TELEGRAM_SHOWCASE) return;
    const link = getTelegramShowcaseLink();
    copyToClipboard(link, 'copyTelegramShowcaseButton', '', true);
    showCopySuccess('showcaseCopyBadge');
}

function copyInstagramUsername() {
    if (INSTAGRAM_USERNAME) {
        copyToClipboard('@' + INSTAGRAM_USERNAME, 'copyInstagramButton', '', true);
        showCopySuccess('instagramCopyBadge');
    }
}

function copyBiggoLive() {
    if (BIGGO_LIVE_URL) {
        const url = getBiggoLiveUrl();
        copyToClipboard(url, 'copyBiggoLiveButton', '', true);
        showCopySuccess('biggoLiveCopyBadge');
    }
}

function showCopySuccess(badgeId) {
    const badge = document.getElementById(badgeId);
    if (badge) {
        badge.classList.add('show');
        setTimeout(() => badge.classList.remove('show'), 2000);
    }
}

// === Решта функцій (модалки, відкриття, календар тощо) ===
// Вставте сюди весь інший оригінальний код:
// showContactModal, closeContactModal, modalCopyContact, modalOpenContact,
// openTelegram, openViber, openInstagram, openBiggoLive,
// функції Biggo, весь календар, generatePublicOffer тощо.

// Ініціалізація (залиште як було, тільки без перевірок безпеки)
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Весь ваш код заповнення полів (shopName, ibanValue, контакти тощо)

        // Особливо важливо для шаблону:
        const templateEl = document.getElementById('paymentTemplateDisplay');
        if (templateEl && (AFTER_PAYMENT_TEMPLATE || window.AFTER_PAYMENT_TEMPLATE)) {
            const text = AFTER_PAYMENT_TEMPLATE || window.AFTER_PAYMENT_TEMPLATE || '';
            templateEl.textContent = text;
            templateEl.style.whiteSpace = 'pre-line';
        }

        generatePublicOffer();

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape') closeContactModal();
        });
    }, 100);
});
