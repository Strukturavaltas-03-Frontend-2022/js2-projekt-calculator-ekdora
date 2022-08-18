const commonCalcBtnIdPart = 'calc__btn_';
const calcBtns = document.querySelectorAll(`[id^=${commonCalcBtnIdPart}]`);
let screenInput = '';
const calcInput = document.querySelector('#calc__input');

const btnsMap = {
	sum: '+',
	zero: 0,
	one: 1,
	two: 2,
	three: 3,
	four: 4,
	five: 5,
	six: 6,
	seven: 7,
	eight: 8,
	nine: 9,
};

const eventListenerFactory = (htmlElements) => {
	htmlElements.forEach(element => {
		element.addEventListener(
			'click',
			() => {
				// kiszűrni az = jelet, kiszűrni a C jelet, az egyéb jelek kódja már megvan
				// if() else if() else
				const selectedBtnSign = btnsMap[element.id.replace(commonCalcBtnIdPart, '')];
				screenInput += selectedBtnSign;
				calcInput.value = screenInput;
			}
		);
	});
};

eventListenerFactory(calcBtns);