// Глобальні налаштування
const FORM_GENERATOR_URL = 'https://veo-optimization.github.io/mini-site/assets/form-generator.html';

// Функція для форматування номера
function formatPhoneNumber(phoneNumber) {
    if (phoneNumber.length === 10 && phoneNumber.startsWith('0')) {
        return "+380" + phoneNumber.substring(1);
    }
    return phoneNumber;
}

// Функція для створення Viber URL
function createViberUrl(phoneNumber) {
    const formattedNumber = formatPhoneNumber(phoneNumber);
    return `viber://chat?number=${encodeURIComponent(formattedNumber)}`;
}

// Функція для копіювання в буфер обміну
function copyToClipboard(text, buttonId, successMessage, skipButtonChange) {
    navigator.clipboard.writeText(text).then(function() {
        if (!skipButtonChange) {
            const button = document.getElementById(buttonId);
            if (button) {
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
               
                button.innerHTML = successMessage || '✓ Скопійовано!';
                button.style.background = '#2196F3';
                button.style.color = '#ffffff';
               
                button.style.width = originalWidth;
                button.style.height = originalHeight;
                button.style.minWidth = originalMinWidth;
                button.style.minHeight = originalMinHeight;
                button.style.padding = originalPadding;
                button.style.boxSizing = originalBoxSizing;
               
                setTimeout(function() {
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
            }
        }
    }).catch(function(err) {
        alert('Не вдалося скопіювати');
    });
}

function copyIBAN() {
    copyToClipboard(IBAN, 'copyIbanButton', '✓ IBAN скопійовано', false);
}

function copyEDRPOU() {
    copyToClipboard(EDRPOU, 'copyEdrpouButton', '✓ ЄДРПОУ скопійовано', false);
}

function copyPaymentPurpose() {
    copyToClipboard(PAYMENT_PURPOSE, 'copyPurposeButton', '✓ Призначення скопійовано');
}

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

// ============================================
// МОДАЛЬНЕ ВІКНО ДЛЯ КОНТАКТІВ
// ============================================
let currentContactData = null;

function showContactModal(messengerName, contactValue, contactType) {
    let displayValue = contactValue;
    if (contactType === 'biggo' && BIGGO_LIVE_URL) {
        const username = getBiggoLiveUsername();
        displayValue = username || contactValue;
    }
   
    currentContactData = {
        name: messengerName,
        value: contactValue,
        displayValue: displayValue,
        type: contactType
    };
   
    const modal = document.getElementById('contactModal');
    const modalTitle = document.getElementById('modalMessengerName');
    const modalValue = document.getElementById('modalContactValue');
    const modalIcon = document.getElementById('modalIcon');
    const modalOpenBtn = document.querySelector('.modal-open-btn');
   
    modalTitle.textContent = messengerName;
   
    if (contactType === 'biggo' && BIGGO_LIVE_URL) {
        const username = getBiggoLiveUsername();
        modalValue.innerHTML = '<div style="text-align: center;"><div style="font-size: 18px; font-weight: 600; color: #ffffff; margin-bottom: 12px;">' + (username || '') + '</div><div style="font-size: 13px; color: #b0b0b0
