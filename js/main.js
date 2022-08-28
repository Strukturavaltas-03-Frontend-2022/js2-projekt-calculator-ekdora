const calcBtns = document.querySelectorAll(`[id^='calc__btn_']`);
let screenInput = '';
const calcInput = document.querySelector('#calc__input');

const doOp = {
	'+': (a, b) => a + b,
	'-': (a, b) => a - b,
	'x': (a, b) => a * b,
	'÷': (a, b) => b ? a / b : 'Nullával nem lehet osztani',
};

const calcResult = (typedString) => {
	const typedNums = typedString.split(/\+|-|x|÷/);
	const firstTypedNum = typedNums[0];
	if (!firstTypedNum) {
		typedNums[0] = '0';
	}
	const typedOps = typedString.split('').filter(char => /\+|-|x|÷/.test(char));
	const nums = typedNums.map((typedNum) => parseFloat(typedNum));
	let result = nums[0];
	for (let i = 1; i < nums.length; i++) {
		const num = nums[i];
		result = doOp[typedOps[i - 1]](result, num);
	}

	return result;
};

const eventListenerFactory = (htmlElements) => {
	htmlElements.forEach(element => {
		element.addEventListener(
			'click',
			() => {
				const selectedBtnSign = element.innerHTML;
				const isLastCharSpec = screenInput.length === 23 && /\.|\+|-|x|÷/.test(selectedBtnSign);

				if (screenInput.length < 24 && !isLastCharSpec || selectedBtnSign === 'C' || selectedBtnSign === '=') {
					const prevChar = screenInput?.charAt(screenInput.length - 1);
					const beforePrevChar = screenInput.length > 1 && screenInput?.charAt(screenInput.length - 2);
					const lastTwoCharZero = prevChar === '0' && selectedBtnSign === '0';
					const afterOpMoreZeros = beforePrevChar && /\+|-|x|÷/.test(beforePrevChar) && lastTwoCharZero;
					const afterFirstZeroMoreZeros = screenInput.length === 1 && lastTwoCharZero;

					if (!afterOpMoreZeros && !afterFirstZeroMoreZeros) {
						if (selectedBtnSign === '=' && /\d/.test(prevChar)) {
							const result = calcResult(screenInput);
							screenInput = '';
							calcInput.value = result;
						} else if (selectedBtnSign === 'C') {
							screenInput = '';
							calcInput.value = '';
						} else if (selectedBtnSign !== '=') {
							const hasError = /(\.|\+|-|x|÷)[^0-9]/.test(`${prevChar}${selectedBtnSign}`)
								|| !screenInput && /\.|\+|x|÷/.test(selectedBtnSign);

							if (!hasError) {
								screenInput += selectedBtnSign;
								calcInput.value = screenInput;
							}
						};
					}
				}
			}
		);
	});
};

eventListenerFactory(calcBtns);